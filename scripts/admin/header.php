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
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo $core->site_name;?></title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link href="../theme/css/admin.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../assets/jquery-ui.css" type="text/css" />
<script type="text/javascript" src="../assets/js/jquery.js"></script>
<script type="text/javascript" src="../assets/js/jquery-ui.js"></script>
<script src="../assets/js/jquery.ui.touch-punch.js"></script>
<script src="../assets/js/jquery.wysiwyg.js"></script>
<script src="../assets/js/global.js"></script>
<script src="../assets/js/custom.js"></script>
<script src="../assets/js/modernizr.mq.js" type="text/javascript" ></script>
<script src="../assets/js/checkbox.js"></script>
<script src="../assets/js/menu.js"></script>
</head>
<body>
<div id="loader" style="display:none"></div>
<div id="navbar">
  <div class="container">
    <div class="row grid_24 clearfix">
      <div class="col grid_14"> <a href="index.php"><?php echo ($core->logo) ? '<img src="'.SITEURL.'/uploads/'.$core->logo.'" alt="'.$core->site_name.'" class="logo"/>': $core->site_name;?></a> </div>
      <div class="col grid_10">
        <p class="flright">Welcome: <?php echo $user->username;?><br />Last Login: <?php echo strftime("%c", strtotime($user->last));?></p>
      </div>
    </div>
  </div>
</div>
<div id="crumbs">
  <div class="container">
    <div class="row grid_24 clearfix">
      <div class="col grid_16"> <i class="icon-th"></i> <a href="index.php">Dashboard</a> <i class="icon-angle-right"></i>
        <?php include("crumbs.php");?>
      </div>
      <div class="col grid_8 nav-extra">
        <p class="flright"><a href="index.php?do=users&amp;action=edit&amp;id=<?php echo $user->uid;?>"><i class="icon-user"></i> Profile</a> <a href="logout.php"><i class="icon-off"></i> Sign Out</a> </p>
      </div>
    </div>
  </div>
</div>

<!-- Start Header-->
<div class="container">
  <div class="topheader">
    <nav class="cbp-hsmenu-wrapper" id="cbp-hsmenu-wrapper">
      <div class="cbp-hsinner">
        <ul class="cbp-hsmenu">
          <li><a href="index.php?do=users" title="User Management"><i class="icon-user"></i> User Management</a></li>
          <li><a href="index.php?do=news" title="News Manager"><i class="icon-file-text-alt"></i> News Manager</a></li>
          <li><a title="Memberships"><i class="icon-group"></i> Memberships</a>
            <ul class="cbp-hssubmenu">
              <li><a href="index.php?do=memberships" title="Manage Memberships"><i class="icon-group"></i><span>Manage Memberships</span></a></li>
              <li><a href="index.php?do=gateways" title="Payment Gateways"><i class="icon-bookmark"></i><span>Payment Gateways</span></a></li>
              <li><a href="index.php?do=transactions" title="Transaction Records"><i class="icon-credit-card"></i><span>Transaction Records</span></a></li>
            </ul>
          </li>
          <li><a href="index.php?do=newsletter" title="Newsletter"><i class="icon-envelope"></i> Newsletter</a></li>
          <li><a title="Configuration"><i class="icon-cog"></i> Configuration</a>
            <ul class="cbp-hssubmenu">
              <li><a href="index.php?do=config" title="Site Configuration"><i class="icon-cog"></i><span>Site Configuration</span></a></li>
              <li><a href="index.php?do=templates" title="Email Templates"><i class="icon-file-text"></i><span>Email Templates</span></a></li>
              <li><a href="index.php?do=maintenance" title="Site Maintenance"><i class="icon-cogs"></i><span>Site Maintenance</span></a></li>
              <li><a href="index.php?do=backup" title="Database Backup/Restore"><i class="icon-hdd"></i><span>Database Backup/Restore</span></a></li>
            </ul>
          </li>
          <li><a title="Help Management"><i class="icon-question-sign"></i> Help Section</a>
            <ul class="cbp-hssubmenu">
              <li><a href="index.php?do=help-login" title="Login Based Protection"><i class="icon-lock"></i><span>Login Based Protection</span></a></li>
              <li><a href="index.php?do=help-redirect" title="Login Redirect"><i class="icon-exchange"></i><span>Login Redirect</span></a></li>
              <li><a href="index.php?do=help-member" title="Membership Based Protection"><i class="icon-shield"></i><span>Membership Protection</span></a></li>
              <li><a href="index.php?do=help-cron" title="Cron Jobs"><i class="icon-terminal"></i><span>Cron Jobs</span></a></li>
              <li><a href="index.php?do=builder" title="Page Builder"><i class="icon-coffee"></i><span>Page Builder</span></a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <!-- End Header--> 
