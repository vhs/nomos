<?php
  /**
   * Login Redirect Help
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: help-redirect.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i><strong>Redirecting user on successful login</strong><br />
  Here you can find instructions on how to protect your pages based on user level, login state etc..</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Help Section <i class="icon-double-angle-right"></i> Login Redirect</h1>
    </div>
  </header>
  <div class="content2">
    <section class="content">
      <div class="pagetip">By default when user logs in, it will be redirected to profile page. You can change this behavior by redirecting user to any page of your choice.</div>
      <div class="pagetip">First start by creating a new php page that you want to redirect user on successful login.<br />
        Let's call this page for the purpose of this tutorial <strong>redirect_page.php</strong><br />
      </div>
      <div class="pagetip"> <strong>1</strong>. Open up index.php page in root directory and look for :
<?php
  highlight_string('
  <?php
	if ($result)
		redirect_to("account.php");
  ?>');
?>
        <br />
        Replace <strong>account.php </strong>with your new redirect page <strong>redirect_page.php</strong> Make sure that <strong>redirect_page.php</strong> point to correct directory. For example, If your <strong><em>redirect_page.php</em></strong> page is in the same directory as main script, than no changes are necessary, otherwise you need to enter correct path to your redirect_page.php page. Depending where you placed <strong><em>redirect_page.php</em></strong> page, below or above root directory redirect_page.php becomes <strong>../redirect_page.php</strong> if below the root or <strong>otherdirectory/redirect_page.php</strong> if above the root.</div>
      <div class="pagetip"><strong>2</strong>. Now you can continue to add the usual html or php code to your page.</div>
      <div class="pagetip"> <strong>If you need to protect this page using valid membership, follow instructions from Help Section</strong>.</div>
      <div class="pagetip"> <em>In this example on successful login, we redirected user to our custom page.</em> </div>
    </section>
  </div>
</section>