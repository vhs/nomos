<?php
  /**
   * Account Activation
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: activate.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("init.php");
  
  if ($user->logged_in)
      redirect_to("account.php");
?>
<?php include("header.php");?>
<p class="bluetip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can activate your account. Please enter your email address and activation code received.<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>Account Activation<span>Activate Your Account</span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-envelope-alt"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="email" placeholder="Email">
      </label>
      <div class="note note-error">Email Address</div>
    </section>
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-filter"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="token" placeholder="Activation Token">
      </label>
      <div class="note note-error">Activation Token</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Activate Account<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=index" class="button button-secondary">Back to login</a> </footer>
</form>
<?php echo Core::doForm("accActivate","ajax/user.php");?>
<?php include("footer.php");?>