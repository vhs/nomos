<?php
  /**
   * Thumbmaker
   *
   * @package wojo:cms
   * @author wojoscripts.com
   * @copyright 2012
   * @version $Id: thumbmaker.php, v1.00 2012-03-05 10:12:05 gewa Exp $
   */
  
  define('VERSION', '2.8');

  if (!defined('MEMORY_LIMIT'))
      define('MEMORY_LIMIT', '20M');

  if (!defined('FILE_CACHE_ENABLED'))
      define('FILE_CACHE_ENABLED', true);

  if (!defined('FILE_CACHE_TIME_BETWEEN_CLEANS'))
      define('FILE_CACHE_TIME_BETWEEN_CLEANS', 86400);

  if (!defined('FILE_CACHE_MAX_FILE_AGE'))
      define('FILE_CACHE_MAX_FILE_AGE', 86400);

  if (!defined('FILE_CACHE_SUFFIX'))
      define('FILE_CACHE_SUFFIX', '.thumbimg');

  if (!defined('FILE_CACHE_DIRECTORY'))
      define('FILE_CACHE_DIRECTORY', './cache');

  if (!defined('MAX_FILE_SIZE'))
      define('MAX_FILE_SIZE', 10485760);

  if (!defined('WAIT_BETWEEN_FETCH_ERRORS'))
      define('WAIT_BETWEEN_FETCH_ERRORS', 3600);

  if (!defined('BROWSER_CACHE_MAX_AGE'))
      define('BROWSER_CACHE_MAX_AGE', 864000);

  if (!defined('BROWSER_CACHE_DISABLE'))
      define('BROWSER_CACHE_DISABLE', false);

  if (!defined('MAX_WIDTH'))
      define('MAX_WIDTH', 1500);

  if (!defined('MAX_HEIGHT'))
      define('MAX_HEIGHT', 1500);

  if (!defined('NOT_FOUND_IMAGE'))
      define('NOT_FOUND_IMAGE', '');

  if (!defined('ERROR_IMAGE'))
      define('ERROR_IMAGE', '');


  timthumb::start();

  class timthumb
  {
      protected $src = "";
      protected $is404 = false;
      protected $docRoot = "";
      protected $lastURLError = false;
      protected $localImage = "";
      protected $localImageMTime = 0;
      protected $url = false;
      protected $myHost = "";
      protected $cachefile = '';
      protected $errors = array();
      protected $toDeletes = array();
      protected $cacheDirectory = '';
      protected $startTime = 0;
      protected $lastBenchTime = 0;
      protected $cropTop = false;
      protected $salt = "";
      protected $fileCacheVersion = 1;
      protected $filePrependSecurityBlock = "<?php die('Execution denied!'); //";
     
	 
	  /**
	   * timthumb::start()
	   * 
	   * @return
	   */
	  public static function start()
      {
          $tim = new timthumb();
          $tim->handleErrors();
          $tim->securityChecks();
          if ($tim->tryBrowserCache()) {
              exit(0);
          }
          $tim->handleErrors();
          if (FILE_CACHE_ENABLED && $tim->tryServerCache()) {
              exit(0);
          }
          $tim->handleErrors();
          $tim->run();
          $tim->handleErrors();
          exit(0);
      }

      /**
       * timthumb::__construct()
       * 
       * @return
       */
      public function __construct()
      {
          $this->startTime = microtime(true);
          date_default_timezone_set('UTC');
          $this->calcDocRoot();
          $this->salt = @filemtime(__file__) . '-' . @fileinode(__file__);
          if (FILE_CACHE_DIRECTORY) {
              if (!is_dir(FILE_CACHE_DIRECTORY)) {
                  @mkdir(FILE_CACHE_DIRECTORY);
                  if (!is_dir(FILE_CACHE_DIRECTORY)) {
                      $this->error("Could not create the file cache directory.");
                      return false;
                  }
              }

              $this->cacheDirectory = FILE_CACHE_DIRECTORY;
              if (!touch($this->cacheDirectory . '/index.html')) {
                  $this->error("Could note create the index.html file.");
              }
          } else {
              $this->cacheDirectory = sys_get_temp_dir();
          }

          $this->cleanCache();

          $this->myHost = preg_replace('/^www\./i', '', $_SERVER['HTTP_HOST']);
          $this->src = $this->param('src');
          $this->url = parse_url($this->src);
          if (strlen($this->src) <= 3) {
              $this->error("No image specified");
              return false;
          }
          if (array_key_exists('HTTP_REFERER', $_SERVER) && (!preg_match('/^https?:\/\/(?:www\.)?' . $this->myHost . '(?:$|\/)/i', $_SERVER['HTTP_REFERER']))) {
              $imgData = base64_decode("R0lGODlhUAAMAIAAAP8AAP///yH5BAAHAP8ALAAAAABQAAwAAAJpjI+py+0Po5y0OgAMjjv01YUZ\nOGplhWXfNa6JCLnWkXplrcBmW+spbwvaVr/cDyg7IoFC2KbYVC2NQ5MQ4ZNao9Ynzjl9ScNYpneb\nDULB3RP6JuPuaGfuuV4fumf8PuvqFyhYtjdoeFgAADs=");
              header('Content-Type: image/gif');
              header('Content-Length: ' . sizeof($imgData));
              header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
              header("Pragma: no-cache");
              header('Expires: ' . gmdate('D, d M Y H:i:s', time()));
              echo $imgData;
              return false;
              exit(0);
          }
          if (preg_match('/https?:\/\/(?:www\.)?' . $this->myHost . '(?:$|\/)/i', $this->src)) {
              $this->src = preg_replace('/https?:\/\/(?:www\.)?' . $this->myHost . '/i', '', $this->src);
          }

          $cachePrefix = 'thumbimg_int_';

          $this->localImage = $this->getLocalImagePath($this->src);
          if (!$this->localImage) {
              $this->error("Could not find the internal image you specified.");
              $this->set404();
              return false;
          }
          $this->localImageMTime = @filemtime($this->localImage);
          $this->cachefile = $this->cacheDirectory . '/' . $cachePrefix . md5($this->salt . $this->localImageMTime . $_SERVER['QUERY_STRING'] . $this->fileCacheVersion) . FILE_CACHE_SUFFIX;

          return true;
      }
	  
      /**
       * timthumb::__destruct()
       * 
       * @return
       */
      public function __destruct()
      {
          foreach ($this->toDeletes as $del) {
              @unlink($del);
          }
      }
	  
      /**
       * timthumb::run()
       * 
       * @return
       */
      public function run()
      {
          $this->serveInternalImage();
          return true;
      }
	  
      /**
       * timthumb::handleErrors()
       * 
       * @return
       */
      protected function handleErrors()
      {
          if ($this->haveErrors()) {
              if (NOT_FOUND_IMAGE && $this->is404()) {
                  if ($this->serveImg(NOT_FOUND_IMAGE)) {
                      exit(0);
                  } else {
                      $this->error("Additionally, the 404 image that is configured could not be found or there was an error serving it.");
                  }
              }
              if (ERROR_IMAGE) {
                  if ($this->serveImg(ERROR_IMAGE)) {
                      exit(0);
                  } else {
                      $this->error("Additionally, the error image that is configured could not be found or there was an error serving it.");
                  }
              }

              $this->serveErrors();
              exit(0);
          }
          return false;
      }
	  
      /**
       * timthumb::tryBrowserCache()
       * 
       * @return
       */
      protected function tryBrowserCache()
      {
          if (BROWSER_CACHE_DISABLE) {
              return false;
          }
          if (!empty($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
              $mtime = false;

              if (!is_file($this->cachefile)) {
                  return false;
              }
              if ($this->localImageMTime) {
                  $mtime = $this->localImageMTime;
              } elseif (is_file($this->cachefile)) {
                      $mtime = @filemtime($this->cachefile);
                  }
              if (!$mtime) {
                  return false;
              }

              $iftime = strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']);
              if ($iftime < 1) {
                  return false;
              }
              if ($iftime < $mtime) {
                  return false;
              } else {
                  header($_SERVER['SERVER_PROTOCOL'] . ' 304 Not Modified');
                  return true;
              }
          }
          return false;
      }
	  
      /**
       * timthumb::tryServerCache()
       * 
       * @return
       */
      protected function tryServerCache()
      {
          if (file_exists($this->cachefile)) {
              if ($this->serveCacheFile()) {
                  return true;
              } else {
                  @unlink($this->cachefile);
                  return true;
              }
          }
      }
	  
      /**
       * timthumb::error()
       * 
       * @param mixed $err
       * @return
       */
      protected function error($err)
      {
          $this->errors[] = $err;
          return false;

      }
	  
      /**
       * timthumb::haveErrors()
       * 
       * @return
       */
      protected function haveErrors()
      {
          if (sizeof($this->errors) > 0) {
              return true;
          }
          return false;
      }
	  
      /**
       * timthumb::serveErrors()
       * 
       * @return
       */
      protected function serveErrors()
      {
		  echo "<div class=\"msgError\" style=\"color:#444;width:600px;margin-left:auto;margin-right:auto;border:1px solid #C3C3C3;font-family:Arial, Helvetica, sans-serif;font-size:13px;padding:10px;background:#f2f2f2;border-radius:5px;text-shadow:1px 1px 0 #fff\">";
		  $html = '';
          foreach ($this->errors as $err) {
              $html .= '<li>' . htmlentities($err) . '</li>';
          }
          
          header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
          echo '<h4 style="font-size:18px;margin:0;padding:0">The following error(s) occured</h4>';
		  print'<ul>';
          print $html;
		  print '</ul>';
          echo '<br />Query String : ' . htmlentities($_SERVER['QUERY_STRING']);
          //echo '<br />TimThumb version : ' . VERSION;
		  echo '</div>';
      }
	  
      /**
       * timthumb::serveInternalImage()
       * 
       * @return
       */
      protected function serveInternalImage()
      {
          if (!$this->localImage) {
              $this->sanityFail("localImage not set after verifying it earlier in the code.");
              return false;
          }
          $fileSize = filesize($this->localImage);
          if ($fileSize > MAX_FILE_SIZE) {
              $this->error("The file you specified is greater than the maximum allowed file size.");
              return false;
          }
          if ($fileSize <= 0) {
              $this->error("The file you specified is <= 0 bytes.");
              return false;
          }
          if ($this->processImageAndWriteToCache($this->localImage)) {
              $this->serveCacheFile();
              return true;
          } else {
              return false;
          }
      }
	  
      /**
       * timthumb::cleanCache()
       * 
       * @return
       */
      protected function cleanCache()
      {
          $lastCleanFile = $this->cacheDirectory . '/thumbimg_cacheLastCleanTime.touch';

          if (!is_file($lastCleanFile)) {
              if (!touch($lastCleanFile)) {
                  $this->error("Could note create cache clean timestamp file.");
              }
              return;
          }
          if (@filemtime($lastCleanFile) < (time() - FILE_CACHE_TIME_BETWEEN_CLEANS)) {
              if (!touch($lastCleanFile)) {
                  $this->error("Could note create cache clean timestamp file.");
              }
              $files = glob($this->cacheDirectory . '/*' . FILE_CACHE_SUFFIX);
              $timeAgo = time() - FILE_CACHE_MAX_FILE_AGE;
              foreach ($files as $file) {
                  if (@filemtime($file) < $timeAgo) {
                      @unlink($file);
                  }
              }
              return true;
          }
          return false;
      }
	  
      /**
       * timthumb::processImageAndWriteToCache()
       * 
       * @param mixed $localImage
       * @return
       */
      protected function processImageAndWriteToCache($localImage)
      {
          $sData = getimagesize($localImage);
          $origType = $sData[2];
          $mimeType = $sData['mime'];

          if (!preg_match('/^image\/(?:gif|jpg|jpeg|png)$/i', $mimeType)) {
              return $this->error("The image being resized is not a valid gif, jpg or png.");
          }

          if (!function_exists('imagecreatetruecolor')) {
              return $this->error('GD Library Error: imagecreatetruecolor does not exist - please contact your webhost and ask them to install the GD library');
          }

          $new_width = (int)abs($this->param('w', 0));
          $new_height = (int)abs($this->param('h', 0));
          $zoom_crop = (int)$this->param('zc', 1);
          $quality = (int)abs($this->param('q', 90));
          $align = $this->cropTop ? 't' : $this->param('a', 'c');
          $filters = $this->param('f', '');
          $sharpen = (bool)$this->param('s', 0);
          $canvas_color = $this->param('cc', 'ffffff');

          if ($new_width == 0 && $new_height == 0) {
              $new_width = 100;
              $new_height = 100;
          }

          $new_width = min($new_width, MAX_WIDTH);
          $new_height = min($new_height, MAX_HEIGHT);

          $this->setMemoryLimit();

          $image = $this->openImage($mimeType, $localImage);
          if ($image === false) {
              return $this->error('Unable to open image.');
          }

          $width = imagesx($image);
          $height = imagesy($image);
          $origin_x = 0;
          $origin_y = 0;

          if ($new_width && !$new_height) {
              $new_height = floor($height * ($new_width / $width));
          } else
              if ($new_height && !$new_width) {
                  $new_width = floor($width * ($new_height / $height));
              }

          if ($zoom_crop == 3) {

              $final_height = $height * ($new_width / $width);

              if ($final_height > $new_height) {
                  $new_width = $width * ($new_height / $height);
              } else {
                  $new_height = $final_height;
              }

          }

          $canvas = imagecreatetruecolor($new_width, $new_height);
          imagealphablending($canvas, false);

          if (strlen($canvas_color) < 6) {
              $canvas_color = 'ffffff';
          }

          $canvas_color_R = hexdec(substr($canvas_color, 0, 2));
          $canvas_color_G = hexdec(substr($canvas_color, 2, 2));
          $canvas_color_B = hexdec(substr($canvas_color, 2, 2));

          $color = imagecolorallocatealpha($canvas, $canvas_color_R, $canvas_color_G, $canvas_color_B,
              127);

          imagefill($canvas, 0, 0, $color);

          if ($zoom_crop == 2) {

              $final_height = $height * ($new_width / $width);

              if ($final_height > $new_height) {

                  $origin_x = $new_width / 2;
                  $new_width = $width * ($new_height / $height);
                  $origin_x = round($origin_x - ($new_width / 2));

              } else {

                  $origin_y = $new_height / 2;
                  $new_height = $final_height;
                  $origin_y = round($origin_y - ($new_height / 2));

              }

          }

          imagesavealpha($canvas, true);

          if ($zoom_crop > 0) {

              $src_x = $src_y = 0;
              $src_w = $width;
              $src_h = $height;

              $cmp_x = $width / $new_width;
              $cmp_y = $height / $new_height;

              if ($cmp_x > $cmp_y) {

                  $src_w = round($width / $cmp_x * $cmp_y);
                  $src_x = round(($width - ($width / $cmp_x * $cmp_y)) / 2);

              } else
                  if ($cmp_y > $cmp_x) {

                      $src_h = round($height / $cmp_y * $cmp_x);
                      $src_y = round(($height - ($height / $cmp_y * $cmp_x)) / 2);

                  }

              if ($align) {
                  if (strpos($align, 't') !== false) {
                      $src_y = 0;
                  }
                  if (strpos($align, 'b') !== false) {
                      $src_y = $height - $src_h;
                  }
                  if (strpos($align, 'l') !== false) {
                      $src_x = 0;
                  }
                  if (strpos($align, 'r') !== false) {
                      $src_x = $width - $src_w;
                  }
              }

              imagecopyresampled($canvas, $image, $origin_x, $origin_y, $src_x, $src_y, $new_width,
                  $new_height, $src_w, $src_h);

          } else {

              imagecopyresampled($canvas, $image, 0, 0, 0, 0, $new_width, $new_height, $width,
                  $height);

          }


          if ((IMAGETYPE_PNG == $origType || IMAGETYPE_GIF == $origType) &&
              function_exists('imageistruecolor') && !imageistruecolor($image) &&
              imagecolortransparent($image) > 0) {
              imagetruecolortopalette($canvas, false, imagecolorstotal($image));
          }

          $imgType = "";
          $tempfile = tempnam($this->cacheDirectory, 'timthumb_tmpimg_');
          if (preg_match('/^image\/(?:jpg|jpeg)$/i', $mimeType)) {
              $imgType = 'jpg';
              imagejpeg($canvas, $tempfile, $quality);
          } elseif (preg_match('/^image\/png$/i', $mimeType)) {
			  $imgType = 'png';
			  imagepng($canvas, $tempfile, floor($quality * 0.09));
		  } elseif (preg_match('/^image\/gif$/i', $mimeType)) {
			  $imgType = 'gif';
			  imagegif($canvas, $tempfile);
		  } else {
			  return $this->sanityFail("Could not match mime type after verifying it previously.");
		  }

          $tempfile4 = tempnam($this->cacheDirectory, 'timthumb_tmpimg_');
          $context = stream_context_create();
          $fp = fopen($tempfile, 'r', 0, $context);
          file_put_contents($tempfile4, $this->filePrependSecurityBlock . $imgType . ' ?' . '>');

          file_put_contents($tempfile4, $fp, FILE_APPEND);
          fclose($fp);
          @unlink($tempfile);
          $lockFile = $this->cachefile . '.lock';
          $fh = fopen($lockFile, 'w');
          if (!$fh) {
              return $this->error("Could not open the lockfile for writing an image.");
          }
          if (flock($fh, LOCK_EX)) {
              @unlink($this->cachefile);

              rename($tempfile4, $this->cachefile);
              flock($fh, LOCK_UN);
              fclose($fh);
              @unlink($lockFile);
          } else {
              fclose($fh);
              @unlink($lockFile);
              @unlink($tempfile4);
              return $this->error("Could not get a lock for writing.");
          }
          imagedestroy($canvas);
          imagedestroy($image);
          return true;
      }
	  
      /**
       * timthumb::calcDocRoot()
       * 
       * @return
       */
      protected function calcDocRoot()
      {
		$docRoot = @$_SERVER['DOCUMENT_ROOT'];
		if(!isset($docRoot)){ 
			if(isset($_SERVER['SCRIPT_FILENAME'])) {
				$docRoot = str_replace( '\\', '/', substr($_SERVER['SCRIPT_FILENAME'], 0, 0-strlen($_SERVER['PHP_SELF'])));
			} 
		}
		if(!isset($docRoot)){ 
			if(isset($_SERVER['PATH_TRANSLATED'])) {
				$docRoot = str_replace( '\\', '/', substr(str_replace('\\\\', '\\', $_SERVER['PATH_TRANSLATED']), 0, 0-strlen($_SERVER['PHP_SELF'])));
			} 
		}
		if($docRoot && $_SERVER['DOCUMENT_ROOT'] != '/') { 
			$docRoot = preg_replace('/\/$/', '', $docRoot); 
		}
		$this->docRoot = $docRoot;
      }
	  
      /**
       * timthumb::getLocalImagePath()
       * 
       * @param mixed $src
       * @return
       */
      protected function getLocalImagePath($src)
      {
          $src = preg_replace('/^\//', '', $src);
          $realDocRoot = realpath($this->docRoot);

          if (!$this->docRoot) {
              $file = preg_replace('/^.*?([^\/\\\\]+)$/', '$1', $src);
              if (is_file($file)) {
                  return realpath($file);
              }
              return $this->error("Could not find your website document root and the file specified doesn't exist in timthumbs directory. We don't support serving files outside timthumb's directory without a document root for security reasons.");
          }

          if (file_exists($this->docRoot . '/' . $src)) {
              $real = realpath($this->docRoot . '/' . $src);
              if (strpos($real, $realDocRoot) === 0) {
                  return $real;
              }
          }

          $absolute = realpath('/' . $src);
          if ($absolute && file_exists($absolute)) {

              if (!$this->docRoot) {
                  $this->sanityFail("docRoot not set when checking absolute path.");
              }
              if (strpos($absolute, $realDocRoot) === 0) {
                  return $absolute;
              }
          }
          $base = $this->docRoot;
          foreach (explode('/', str_replace($this->docRoot, '', $_SERVER['SCRIPT_FILENAME'])) as
              $sub) {
              $base .= $sub . '/';
              if (file_exists($base . $src)) {
                  $real = realpath($base . $src);
                  if (strpos($real, $realDocRoot) === 0) {
                      return $real;
                  }
              }
          }
          return false;
      }
	  
      /**
       * timthumb::toDelete()
       * 
       * @param mixed $name
       * @return
       */
      protected function toDelete($name)
      {
          $this->toDeletes[] = $name;
      }

      /**
       * timthumb::serveCacheFile()
       * 
       * @return
       */
      protected function serveCacheFile()
      {
          if (!is_file($this->cachefile)) {
              $this->error("serveCacheFile called in timthumb but we couldn't find the cached file.");
              return false;
          }
          $fp = fopen($this->cachefile, 'rb');
          if (!$fp) {
              return $this->error("Could not open cachefile.");
          }
          fseek($fp, strlen($this->filePrependSecurityBlock), SEEK_SET);
          $imgType = fread($fp, 3);
          fseek($fp, 3, SEEK_CUR);
          if (ftell($fp) != strlen($this->filePrependSecurityBlock) + 6) {
              @unlink($this->cachefile);
              return $this->error("The cached image file seems to be corrupt.");
          }
          $imageDataSize = filesize($this->cachefile) - (strlen($this-> filePrependSecurityBlock) + 6);
          $this->sendImageHeaders($imgType, $imageDataSize);
          $bytesSent = @fpassthru($fp);
          fclose($fp);
          if ($bytesSent > 0) {
              return true;
          }
          $content = file_get_contents($this->cachefile);
          if ($content != false) {
              $content = substr($content, strlen($this->filePrependSecurityBlock) + 6);
              echo $content;
              return true;
          } else {
              $this->error("Cache file could not be loaded.");
              return false;
          }
      }
	  
      /**
       * timthumb::sendImageHeaders()
       * 
       * @param mixed $mimeType
       * @param mixed $dataSize
       * @return
       */
      protected function sendImageHeaders($mimeType, $dataSize)
      {
          if (!preg_match('/^image\//i', $mimeType)) {
              $mimeType = 'image/' . $mimeType;
          }
          if (strtolower($mimeType) == 'image/jpg') {
              $mimeType = 'image/jpeg';
          }
          $gmdate_expires = gmdate('D, d M Y H:i:s', strtotime('now +10 days')) . ' GMT';
          $gmdate_modified = gmdate('D, d M Y H:i:s') . ' GMT';
		  
          header('Content-Type: ' . $mimeType);
          header('Accept-Ranges: none');
          header('Last-Modified: ' . $gmdate_modified);
          header('Content-Length: ' . $dataSize);
          if (BROWSER_CACHE_DISABLE) {
              header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
              header("Pragma: no-cache");
              header('Expires: ' . gmdate('D, d M Y H:i:s', time()));
          } else {
              header('Cache-Control: max-age=' . BROWSER_CACHE_MAX_AGE . ', must-revalidate');
              header('Expires: ' . $gmdate_expires);
          }
          return true;
      }
	  
      /**
       * timthumb::securityChecks()
       * 
       * @return
       */
      protected function securityChecks()
      {
      }
	  
      /**
       * timthumb::param()
       * 
       * @param mixed $property
       * @param string $default
       * @return
       */
      protected function param($property, $default = '')
      {
          if (isset($_GET[$property])) {
              return $_GET[$property];
          } else {
              return $default;
          }
      }
	  
      /**
       * timthumb::openImage()
       * 
       * @param mixed $mimeType
       * @param mixed $src
       * @return
       */
      protected function openImage($mimeType, $src)
      {
          switch ($mimeType) {
              case 'image/jpg':

              case 'image/jpeg':
                  $image = imagecreatefromjpeg($src);
                  break;

              case 'image/png':
                  $image = imagecreatefrompng($src);
                  break;

              case 'image/gif':
                  $image = imagecreatefromgif($src);
                  break;
          }

          return $image;
      }
	  
      /**
       * timthumb::getIP()
       * 
       * @return
       */
      protected function getIP()
      {
          $rem = @$_SERVER["REMOTE_ADDR"];
          $ff = @$_SERVER["HTTP_X_FORWARDED_FOR"];
          $ci = @$_SERVER["HTTP_CLIENT_IP"];
          if (preg_match('/^(?:192\.168|172\.16|10\.|127\.)/', $rem)) {
              if ($ff) {
                  return $ff;
              }
              if ($ci) {
                  return $ci;
              }
              return $rem;
          } else {
              if ($rem) {
                  return $rem;
              }
              if ($ff) {
                  return $ff;
              }
              if ($ci) {
                  return $ci;
              }
              return "UNKNOWN";
          }
      }
	  
      /**
       * timthumb::sanityFail()
       * 
       * @param mixed $msg
       * @return
       */
      protected function sanityFail($msg)
      {
          return $this->error("There is a problem in the timthumb code. Message: Please report this error at <a href='http://code.google.com/p/timthumb/issues/list'>timthumb's bug tracking page</a>: $msg");
      }
	  
      /**
       * timthumb::getMimeType()
       * 
       * @param mixed $file
       * @return
       */
      protected function getMimeType($file)
      {
          $info = getimagesize($file);
          if (is_array($info) && $info['mime']) {
              return $info['mime'];
          }
          return '';
      }
      /**
       * timthumb::setMemoryLimit()
       * 
       * @return
       */
      protected function setMemoryLimit()
      {
          $inimem = ini_get('memory_limit');
          $inibytes = timthumb::returnBytes($inimem);
          $ourbytes = timthumb::returnBytes(MEMORY_LIMIT);
          if ($inibytes < $ourbytes) {
              ini_set('memory_limit', MEMORY_LIMIT);
          }
      }
	  
      /**
       * timthumb::returnBytes()
       * 
       * @param mixed $size_str
       * @return
       */
      protected static function returnBytes($size_str)
      {
          switch (substr($size_str, -1)) {
              case 'M':
              case 'm':
                  return (int)$size_str * 1048576;
              case 'K':
              case 'k':
                  return (int)$size_str * 1024;
              case 'G':
              case 'g':
                  return (int)$size_str * 1073741824;
              default:
                  return $size_str;
          }
      }

      /**
       * timthumb::serveImg()
       * 
       * @param mixed $file
       * @return
       */
      protected function serveImg($file)
      {
          $s = getimagesize($file);
          if (!($s && $s['mime'])) {
              return false;
          }
          header('Content-Type: ' . $s['mime']);
          header('Content-Length: ' . filesize($file));
          header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
          header("Pragma: no-cache");
          $bytes = @readfile($file);
          if ($bytes > 0) {
              return true;
          }
          $content = @file_get_contents($file);
          if ($content != false) {
              echo $content;
              return true;
          }
          return false;

      }
	  
      /**
       * timthumb::set404()
       * 
       * @return
       */
      protected function set404()
      {
          $this->is404 = true;
      }
	  
      /**
       * timthumb::is404()
       * 
       * @return
       */
      protected function is404()
      {
          return $this->is404;
      }
  }
?>