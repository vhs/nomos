<?php
  /**
   * Header
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: header.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
	  
	  $news = $core->renderNews();
?>
<!DOCTYPE html>
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html lang="en">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<title><?php echo $core->site_name;?></title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link href="theme/css/front.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="assets/jquery-ui.css" type="text/css" />
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script type="text/javascript" src="assets/js/jquery.js"></script>
<script type="text/javascript" src="assets/js/jquery-ui.js"></script>
<script src="assets/js/jquery.ui.touch-punch.js"></script>
<script src="assets/js/jquery.wysiwyg.js"></script>
<script src="assets/js/global.js"></script>
<script src="assets/js/custom.js"></script>
<script src="assets/js/modernizr.mq.js" type="text/javascript" ></script>
<script src="assets/js/checkbox.js"></script>
</head>
<body>
<div id="loader" style="display:none"></div>
<div class="container">
<div class="row"> 
<div class="col grid_8">
<div id="logo"><a href="index.php"><?php echo ($core->logo) ? '<img src="'.SITEURL.'/uploads/'.$core->logo.'" alt="'.$core->site_name.'" class="logo"/>': $core->site_name;?></a></div>
</div>
<div class="col grid_16">
  <div id="usermenu" class="flright"> <a href="index.php"><i class="icon-laptop"></i> Home Page</a> <a href="contact.php"><i class="icon-envelope"></i> Contact Us</a>
    <?php if($user->logged_in):?>
    <a href="logout.php"><i class="icon-off"></i> Log Off</a>
    <?php endif;?>
    <?php if(!$user->logged_in):?>
    <a href="plans.php"><i class="icon-group"></i> Membership Packages</a>
    <?php endif;?>
    <?php if($user->is_Admin()):?>
    <a href="admin/index.php"><i class="icon-gear"></i> Admin Panel</a>
    <?php endif;?>
  </div>
  </div>
  
  </div>
  <?php if($news):?>
  <div id="news-slide" class="pagetip">
    <div id="news"><i class="icon-microphone icon-3x pull-left"></i><?php echo $news->cdate.' <strong>'.$news->title.'</strong>';?> <?php echo cleanOut($news->body);?> </div>
  </div>
  <?php endif;?>
  <div id="msgholder"></div>