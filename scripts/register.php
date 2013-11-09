<?php
  /**
   * User Register
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: register.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("init.php");

  if ($user->logged_in)
      redirect_to("account.php");
	  
   $numusers = countEntries("users");
?>
<?php include("header.php");?>
<?php if(!$core->reg_allowed):?>
<?php echo Filter::msgAlert("<span>Alert!</span>We are sorry, at this point we do not accept any more registrations");?>
<?php elseif($core->user_limit !=0 and $core->user_limit == $numusers):?>
<?php echo Filter::msgAlert("<span>Alert!</span>We are sorry, maximum number of registered users have been reached");?>
<?php else:?>
<h1>User Registration</h1>
<div id="fullform">
  <p class="bluetip"><i class="icon-lightbulb icon-3x pull-left"></i> Please fill out the form below to become registered member.<br>
	Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
  <form class="xform" id="admin_form" method="post">
	<header>User Registration<span>Create Account</span></header>
	<div class="row">
	  <section class="col col-6">
		<label class="input"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
		  <input type="text" name="username" placeholder="Username">
		</label>
		<div class="note note-error">Username</div>
	  </section>
	  <section class="col col-6">
		<label class="input"> <i class="icon-prepend icon-envelope-alt"></i> <i class="icon-append icon-asterisk"></i>
		  <input type="text" name="email" placeholder="Email">
		</label>
		<div class="note note-error">Email</div>
	  </section>
	</div>
	<div class="row">
	  <section class="col col-6">
		<label class="input"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
		  <input type="password" name="pass" placeholder="Password">
		</label>
		<div class="note note-error">Password</div>
	  </section>
	  <section class="col col-6">
		<label class="input"> <i class="icon-prepend icon-lock"></i> <i class="icon-append icon-asterisk"></i>
		  <input type="password" name="pass2" placeholder="Repeat Password">
		</label>
		<div class="note note-error">Repeat Password <i class="icon-exclamation-sign tooltip" data-title="Password must be at least 6 characters long."></i></div>
	  </section>
	</div>
	<div class="row">
	  <section class="col col-4">
		<label class="input"> <i class="icon-prepend icon-envelope-alt"></i> <i class="icon-append icon-asterisk"></i>
		  <input type="text" name="fname" placeholder="First Name">
		</label>
		<div class="note note-error">First Name</div>
	  </section>
	  <section class="col col-4">
		<label class="input"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
		  <input type="text" name="lname" placeholder="Last Name">
		</label>
		<div class="note note-error">Last Name</div>
	  </section>
	  <section class="col col-4">
		<label class="input"> <img src="lib/captcha.php" alt="" class="captcha-append" /> <i class="icon-prepend icon-eye-open"></i>
		  <input type="text" name="captcha" placeholder="Captcha Code">
		</label>
		<div class="note note-error">Captcha Code</div>
	  </section>
	</div>
	<footer>
	  <button class="button" name="dosubmit" type="submit">Register Account<span><i class="icon-ok"></i></span></button>
	  <a href="index.php?do=index" class="button button-secondary">Back to login</a> </footer>
	<input name="doRegister" type="hidden" value="1" />
  </form>
</div>
<script type="text/javascript">
// <![CDATA[
  function showResponse(msg) {
      hideLoader();
      if (msg == 'OK') {
		  result = "<div class=\"bggreen\"><p><span class=\"icon-ok-sign\"><\/span><i class=\"close icon-remove-circle\"></i><span>Success!<\/span>You have successfully registered. Please check your email for further information<\/p><\/div>";
          $("#fullform").hide();
      } else {
          result = msg;
      }
      $(this).html(result);
      $("html, body").animate({
          scrollTop: 0
      }, 600);
  }
  $(document).ready(function () {
      var options = {
          target: "#msgholder",
          beforeSubmit: showLoader,
          success: showResponse,
          url: "ajax/user.php",
          resetForm: 0,
          clearForm: 0,
          data: {
              processContact: 1
          }
      };
      $("#admin_form").ajaxForm(options);
  });
// ]]>
</script>
<?php endif;?>
<!-- Full Layout /-->
<?php include("footer.php");?>