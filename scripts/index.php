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
  require_once("init.php");
  
  if ($user->logged_in)
      redirect_to("account.php");
	  
	  
  if (isset($_POST['doLogin']))
      : $result = $user->login($_POST['username'], $_POST['password']);
  
  /* Login Successful */
  if ($result)
      : redirect_to("account.php");
  endif;
  endif;
?>
<?php include("header.php");?>
<p class="bluetip"><i class="icon-lightbulb icon-3x pull-left"></i> Please enter your valid username and password to login into your account.<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<div id="msgholder2"><?php print Filter::$showMsg;?></div>
<form method="post" id="login_form" name="login_form" class="xform">
  <header>User Login</header>
  <section>
    <div class="row">
      <div class="col col-3">
        <label>Username</label>
      </div>
      <div class="col col-9">
        <label class="input"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
          <input  type="text" name="username" placeholder="Username">
        </label>
      </div>
    </div>
  </section>
  <section>
    <div class="row">
      <div class="col col-3">
        <label>Password</label>
      </div>
      <div class="col col-9">
        <label class="input"> <i class="icon-prepend icon-lock"></i> <i class="icon-append icon-asterisk"></i>
          <input type="password"  name="password" placeholder="**********">
        </label>
      </div>
    </div>
  </section>
  <footer>
    <div class="row">
      <div class="col col-4">
        <button id="do-passreset" type="button" class="button button-red doleft">Password Reset</button>
      </div>
      <div class="col col-8">
        <button type="submit" name="dosubmit" class="button">Login Now!<span><i class="icon-ok"></i></span></button>
        <?php if($core->reg_allowed):?>
        <a href="register.php" class="button button-secondary">Register Account</a>
        <?php endif;?>
      </div>
    </div>
  </footer>
  <input name="doLogin" type="hidden" value="1" />
</form>
<div id="show-passreset" style="display:none">
  <p class="pagetip"><i class="icon-lightbulb icon-3x pull-left"></i> Enter your username and email address below to reset your password. A verification token will be sent to your email address.<br />
    Once you have received the token, you will be able to choose a new password for your account</p>
  <form class="xform" id="admin_form" method="post">
    <header> Lost Password</header>
    <section>
      <div class="row">
        <div class="col col-3">
          <label>Username</label>
        </div>
        <div class="col col-9">
          <label class="input"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
            <input  type="text" name="uname" placeholder="Username">
          </label>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col col-3">
          <label>Email Address</label>
        </div>
        <div class="col col-9">
          <label class="input"> <i class="icon-prepend icon-envelope-alt"></i> <i class="icon-append icon-asterisk"></i>
            <input  type="text" name="email" placeholder="Email Address">
          </label>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col col-3">
          <label>Captcha Code</label>
        </div>
        <div class="col col-9">
          <label class="input"> <img src="lib/captcha.php" alt="" class="captcha-append" /> <i class="icon-prepend icon-eye-open"></i>
            <input type="text" name="captcha" placeholder="Captcha Code">
          </label>
        </div>
      </div>
    </section>
    <footer>
      <button class="button" name="dosubmit" type="submit">Submit Request</button>
    </footer>
  </form>
</div>
<?php echo Core::doForm("passReset","ajax/user.php");?>
<?php include("footer.php");?>