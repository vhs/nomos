<?php
  /**
   * Cron Job Listing Expiry Seven Days Notice
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2011
   * @version $Id: cron_job7days.php,v 2.00 2010-08-10 21:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("../init.php");
  
  $member->membershipCron(7);
?>