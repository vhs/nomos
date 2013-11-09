<?php
  /**
   * Cron Job Help
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: help-redirect.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i><strong>Setting up cron jobs</strong><br />
  Here you can find instructions on how to protect your pages based on user level, login state etc..</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Help Section <i class="icon-double-angle-right"></i> Cron Jobs</h1>
    </div>
  </header>
  <div class="content2">
    <section class="content">
      <div class="pagetip">Membership Manager Pro is equipped with cron job utility.</div>
      <div class="pagetip">By default there are two files inside /cron/ directory <strong>cron_job0days.php</strong> and <strong>cron_job7days.php</strong><br />
        <strong>cron_job0days.php</strong> will automatically send emails to all users whose membership had expired at the present day, while <strong>cron_job7days.php</strong> will send emails to all users whose membership is about to expire within 7 days.</div>
      <div class="pagetip"> <strong>1</strong>. Each hosting company might have different way of setting cron jobs. Here will give you few examples: <br />
        <ul>
          <li><strong> For CPanel - </strong> http://www.siteground.com/tutorials/cpanel/cron_jobs.htm</li>
          <li><strong>For Plesk Pnel -</strong> http://www.hosting.com/support/plesk/crontab</li>
        </ul>
      </div>
      <div class="pagetip"><strong>2</strong>. If your hosting panel it's not covered here you can always ask your hosting provider.</div>
      <div class="pagetip"> <strong>3.</strong> <strong>cron_job0days.php</strong> and <strong>cron_job7days.php</strong> files should be set up to run every day at midnight</div>
      <div class="pagetip"><strong>4.</strong> <em>Don't forget to modify template files for sending reminders. <a href="index.php?do=templates&action=edit&id=8">Membership Expire 7 days</a> and <a href="index.php?do=templates&action=edit&id=9">Membership Expired Today</a></em> </div>
    </section>
  </div>
</section>