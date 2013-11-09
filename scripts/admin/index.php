<?php
  /**
   * Index
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: index.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("../init.php");

  if (is_dir("../setup"))
      : die("<div style='text-align:center'>" 
		  . "<span style='padding: 5px; border: 1px solid #999; background-color:#EFEFEF;" 
		  . "font-family: Verdana; font-size: 11px; margin-left:auto; margin-right:auto'>" 
		  . "<b>Warning:</b> Please delete setup directory!</span></div>");
  endif;
  
  if (!$user->is_Admin())
      redirect_to("login.php");
?>
<?php include("header.php");?>
  <!-- Start Content-->
<div class="wrap clearfix">
  <div id="content-wrap">
    <div id="content">
     <div id="msgholder"></div>
	   <?php (Filter::$do && file_exists(Filter::$do.".php")) ? include(Filter::$do.".php") : include("main.php");?>
    </div>
  </div>
</div>
  <!-- End Content/-->
<?php include("footer.php");?>