<?php
   
  /**
   * Captcha
   *
   * @package Freelance Manager
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: captcha.php, v2.00 2011-04-20 10:12:05 gewa Exp $
   */
  header("Content-type: image/png");
  define("_VALID_PHP", true);
  
  if (strlen(session_id()) < 1)
	  session_start();
  
  $text = rand(10000,99999); 
  $_SESSION['captchacode'] = $text; 
  $height = 25; 
  $width = 60; 
  $font_size = 14; 
  
  $im = imagecreatetruecolor($width, $height); 
  $textcolor = imagecolorallocate($im, 150, 150, 150);
  $bg = imagecolorallocate( $im, 0, 0, 0 );
  imagestring($im, $font_size, 5, 5,  $text, $textcolor);
  imagecolortransparent( $im, $bg );
  imagefill( $im, 0, 0, $bg );
  
  imagepng($im,NULL,9);
  imagedestroy($im);
?>