<?php
  /**
   * Filter Class
   *
   * @package Freelance Manager
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: class_filter.php, v1.00 2011-04-20 18:20:24 gewa Exp $
   */

  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');

  final class Filter
  {
	  public static $id = null;
      public static $get = array();
      public static $post = array();
      public static $cookie = array();
      public static $files = array();
      public static $server = array();
      private static $marker = array();
	  public static $msgs = array();
	  public static $showMsg;
	  public static $action = null;
	  public static $do = null;

      /**
       * Filter::__construct()
       * 
       * @return
       */
      public function __construct()
      {
		  
          $_GET = self::clean($_GET);
          $_POST = self::clean($_POST);
          $_COOKIE = self::clean($_COOKIE);
          $_FILES = self::clean($_FILES);
          $_SERVER = self::clean($_SERVER);

          self::$get = $_GET;
          self::$post = $_POST;
          self::$cookie = $_COOKIE;
          self::$files = $_FILES;
          self::$server = $_SERVER;

		  self::getAction();
		  self::getDo();
		  self::$id = self::getId();
      }

	  /**
	   * Filter::getId()
	   * 
	   * @return
	   */
	  private static function getId()
	  {
		  if (isset($_REQUEST['id'])) {
			  self::$id = (is_numeric($_REQUEST['id']) && $_REQUEST['id'] > -1) ? intval($_REQUEST['id']) : false;
			  self::$id = sanitize(self::$id);
			  
			  if (self::$id == false) {
				  DEBUG == true ? self::error("You have selected an Invalid Id", "Filter::getId()") : self::ooops();
			  } else
				  return self::$id;
		  }
	  }
	  
      /**
       * Filter::clean()
       * 
       * @param mixed $data
       * @return
       */
      public static function clean($data)
      {
          if (is_array($data)) {
              foreach ($data as $key => $value) {
                  unset($data[$key]);

                  $data[self::clean($key)] = self::clean($value);
              }
          } else {
			  if (ini_get('magic_quotes_gpc')) {
				  $data = stripslashes($data);
			  } else {
				  $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
			  }
		  }

          return $data;
      }

      /**
       * Core::msgAlert()
       * 
	   * @param mixed $msg
	   * @param bool $fader
	   * @param bool $altholder
       * @return
       */	  
	  public static function msgAlert($msg, $fader = false, $altholder = false)
	  {
		self::$showMsg = "<div class=\"bgorange\"><p><span class=\"icon-exclamation-sign\"></span><i class=\"close icon-remove-circle\"></i>" . $msg . "</p></div>";
		if ($fader == true)
		  self::$showMsg .= "<script type=\"text/javascript\"> 
		  // <![CDATA[
			setTimeout(function() {       
			  $(\".msgAlert\").fadeOut(\"slow\",    
			  function() {       
				$(\".msgAlert\").remove();  
			  });
			},
			4000);
		  // ]]>
		  </script>";	
		  
		  print ($altholder) ? '<div id="alt-msgholder">'.self::$showMsg.'</div>' : self::$showMsg;
	  }

      /**
       * Core::msgOk()
       * 
	   * @param mixed $msg
	   * @param bool $fader
	   * @param bool $altholder
       * @return
       */	  
	  public static function msgOk($msg, $fader = false, $altholder = false)
	  {
		self::$showMsg = "<div class=\"bggreen\"><p><span class=\"icon-ok-sign\"></span><i class=\"close icon-remove-circle\"></i>" . $msg . "</p></div>";
		if ($fader == true)
		  self::$showMsg .= "<script type=\"text/javascript\"> 
		  // <![CDATA[
			setTimeout(function() {       
			  $(\".msgOk\").fadeOut(\"slow\",    
			  function() {       
				$(\".msgOk\").remove();  
			  });
			},
			4000);
		  // ]]>
		  </script>";	
		  
		  print ($altholder) ? '<div id="alt-msgholder">'.self::$showMsg.'</div>' : self::$showMsg;
	  }

      /**
       * Core::msgError()
       * 
	   * @param mixed $msg
	   * @param bool $fader
	   * @param bool $altholder
       * @return
       */	  
	  public static function msgError($msg, $fader = false, $altholder = false)
	  {
		self::$showMsg = "<div class=\"bgred\"><p><span class=\"icon-minus-sign\"></span><i class=\"close icon-remove-circle\"></i>" . $msg . "</p></div>";
		if ($fader == true)
		  self::$showMsg .= "<script type=\"text/javascript\"> 
		  // <![CDATA[
			setTimeout(function() {       
			  $(\".msgError\").fadeOut(\"slow\",    
			  function() {       
				$(\".msgError\").remove();  
			  });
			},
			4000);
		  // ]]>
		  </script>";	
	  
		  print ($altholder) ? '<div id="alt-msgholder">'.self::$showMsg.'</div>' : self::$showMsg;
	  }	


	  /**
	   * msgInfo()
	   * 
	   * @param mixed $msg
	   * @param bool $fader
	   * @param bool $altholder
	   * @return
	   */
	  public static function msgInfo($msg, $fader = false, $altholder = false)
	  {
		self::$showMsg = "<div class=\"bgblue\"><p><span class=\"icon-info-sign\"></span><i class=\"close icon-remove-circle\"></i>" . $msg . "</p></div>";
		if ($fader == true)
		  self::$showMsg .= "<script type=\"text/javascript\"> 
		  // <![CDATA[
			setTimeout(function() {       
			  $(\".msgInfo\").fadeOut(\"slow\",    
			  function() {       
				$(\".msgInfo\").remove();  
			  });
			},
			4000);
		  // ]]>
		  </script>";
	  
		  print ($altholder) ? '<div id="alt-msgholder">'.self::$showMsg.'</div>' : self::$showMsg;
	  }
	  
      /**
       * Filter::msgStatus()
       * 
       * @return
       */
	  public static function msgStatus()
	  {
		  self::$showMsg = "<div class=\"bgred\"><p><span class=\"icon-minus-sign\"></span><i class=\"close icon-remove-circle\"></i><span>Error!</span>An error occurred while processing request<ul class=\"error\">";
		  foreach (self::$msgs as $msg) {
			  self::$showMsg .= "<li><i class=\"icon-double-angle-right\"></i> " . $msg . "</li>\n";
		  }
		  self::$showMsg .= "</ul></p></div>";
		  
		  return self::$showMsg;
	  }	 

      /**
       * Filter::error()
       * 
	   * @param mixed $msg
	   * @param mixed $source
       * @return
       */
      public static function error($msg, $source)
      {
          if(DEBUG == true) {
			  $the_error = "<div class=\"red\">";
			  $the_error .= "<span>System ERROR!</span><br />";
			  $the_error .= "DB Error: " . $msg . " <br /> More Information: <br />";
			  $the_error .= "<ul class=\"error\">";
			  $the_error .= "<li> Date : " . date("F j, Y, g:i a") . "</li>";
			  $the_error .= "<li> Function: " . $source . "</li>";
			  $the_error .= "<li> Script: " . $_SERVER['REQUEST_URI'] . "</li>";
			  $the_error .= "<li>&lsaquo; <a href=\"javascript:history.go(-1)\"><strong>Go Back to previous page</strong></a></li>";
			  $the_error .= '</ul>';
			  $the_error .= '</div>';
		  } else {
			  $the_error = "<div class=\"msgError\" style=\"color:#444;width:400px;margin-left:auto;margin-right:auto;border:1px solid #C3C3C3;font-family:Arial, Helvetica, sans-serif;font-size:13px;padding:10px;background:#f2f2f2;border-radius:5px;text-shadow:1px 1px 0 #fff\">";
			  $the_error .= "<h4 style=\"font-size:18px;margin:0;padding:0\">Oops!!!</h4>";
			  $the_error .= "<p>Something went wrong. Looks like the page you're looking for was moved or never existed. Make sure you typed the correct URL or followed a valid link.</p>";
			  $the_error .= "<p>&lsaquo; <a href=\"javascript:history.go(-1)\" style=\"color:#0084FF;\"><strong>Go Back to previous page</strong></a></p>";
			  $the_error .= '</div>';
			  }
          print $the_error;
          die();
      }

      /**
       * Filter::ooops()
       * 
       * @return
       */
      public static function ooops()
      {
          $the_error = "<div class=\"red\" style=\"color:#444;width:400px;margin-left:auto;margin-right:auto;border:1px solid #C3C3C3;font-family:Arial, Helvetica, sans-serif;font-size:13px;padding:10px;background:#f2f2f2;border-radius:5px;text-shadow:1px 1px 0 #fff\">";
          $the_error .= "<h4 style=\"font-size:18px;margin:0;padding:0\">Oops!!!</h4>";
          $the_error .= "<p>Something went wrong. Looks like the page you're looking for was moved or never existed. Make sure you typed the correct URL or followed a valid link.</p>";
          $the_error .= "<p>&lsaquo; <a href=\"javascript:history.go(-1)\" style=\"color:#0084FF;\"><strong>Go Back to previous page</strong></a></p>";
          $the_error .= '</div>';
          print $the_error;
          die();
      }
	  
      /**
       * Filter::getAction()
       * 
       * @return
       */
	  private static function getAction()
	  {
		  if (isset(self::$get['action'])) {
			  $action = ((string)self::$get['action']) ? (string)self::$get['action'] : false;
			  $action = sanitize($action);
			  
			  if ($action == false) {
				  self::error("You have selected an Invalid Action Method","Filter::getAction()");
			  } else
				  return self::$action = $action;
		  }
	  }
	  	  
      /**
       * Filter::getDo()
       * 
       * @return
       */
	  private static function getDo()
	  {
		  if (isset(self::$get['do'])) {
			  $do = ((string)self::$get['do']) ? (string)self::$get['do'] : false;
			  $do = sanitize($do);
			  
			  if ($do == false) {
				  self::error("You have selected an Invalid Do Method","Filter::getDo()");
			  } else
				  return self::$do = $do;
		  }
	  }

	  /**
	   * Filter::checkPost()
	   * 
	   * @param mixed $index
	   * @param mixed $msg
	   * @return
	   */  
	  public static function checkPost($index, $msg) {
		  
		if(empty($_POST[$index]))
		   self::$msgs[$index] = $msg;
	  } 
	  
	  
	  /**
	   * Filter::dodate()
	   * 
	   * @param mixed $format
	   * @param mixed $date
	   * @return
	   */  
	  public static function dodate($format, $date) {
		  
		return strftime(Registry::get("Core")->$format, strtotime($date));
	  } 

	  
	  /**
	   * Filter::readFile()
	   * 
	   * @param mixed $filename
	   * @param boll $retbytes
	   * @return
	   */
	  public static function readFile($filename,$retbytes=true) {  
		 $chunksize = 1*(1024*1024);
		 $buffer = '';  
		 $cnt =0;  
	
		 $handle = fopen($filename, 'rb');  
		 if ($handle === false) {  
			 return false;  
		 }  
		 while (!feof($handle)) {  
			 $buffer = fread($handle, $chunksize);  
			 echo $buffer;  
			 ob_flush();  
			 flush();  
			 if ($retbytes) {  
				 $cnt += strlen($buffer);  
			 }  
		 }  
			 $status = fclose($handle);  
		 if ($retbytes && $status) {  
			 return $cnt;
		 }  
		 return $status;  
	   
	  }	  	
	  
	  /**
	   * Filter::fetchFile()
	   * 
	   * @param mixed $dirname
	   * @param mixed $fname
	   * @param mixed $file_path
	   * @return
	   */
	  public function fetchFile($dirname, $fname, &$file_path)
	  {
		  $dir = opendir($dirname);
		  
		  while ($file = readdir($dir)) {
			  if (empty($file_path) && $file != '.' && $file != '..') {
				  if (is_dir($dirname . '/' . $file)) {
					  self::fetchFile($dirname . '/' . $file, $fname, $file_path);
				  } else {
					  if (file_exists($dirname . '/' . $fname)) {
						  $file_path = $dirname . '/' . $fname;
						  return;
					  }
				  }
			  }
		  }
	  }
	  
      /**
       * Filter::mark()
       * 
       * @param mixed $name
       * @return
       */
      public static function mark($name)
      {
          self::$marker[$name] = microtime();
      }


      /**
       * Filter::elapsed()
       * 
       * @param string $point1
       * @param string $point2
       * @param integer $decimals
       * @return
       */
      public static function elapsed($point1 = '', $point2 = '', $decimals = 4)
      {

          if (!isset(self::$marker[$point1])) {
              return '';
          }

          if (!isset(self::$marker[$point2])) {
              self::$marker[$point2] = microtime();
          }

          list($sm, $ss) = explode(' ', self::$marker[$point1]);
          list($em, $es) = explode(' ', self::$marker[$point2]);

          return number_format(($em + $es) - ($sm + $ss), $decimals);
      }
  }
?>