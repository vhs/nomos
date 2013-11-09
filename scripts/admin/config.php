<?php
  /**
   * Configuration
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: config.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can update your system configuration<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>System Configuration</header>
  <div class="row">
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="The name of your web site, which is displayed in various locations across your site,<br />including email and newsletter notifications"></i>
        <input type="text" name="site_name" value="<?php echo $core->site_name;?>" placeholder="Website Name">
      </label>
      <div class="note note-error">Website Name</div>
    </section>
    <section class="col col-4">
      <label class="input"><i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Insert full URL WITHOUT any trailing slash  (e.g. http://www.yourdomain.com)"></i>
        <input type="text" name="site_url" value="<?php echo $core->site_url;?>" placeholder="Website Url">
      </label>
      <div class="note note-error">Website Url</div>
    </section>
    <section class="col col-4">
      <label class="input"><i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="This is the main email notices will be sent to. It is also used as the from 'email'<br />when emailing other automatic emails"></i>
        <input type="text" name="site_email" value="<?php echo $core->site_email;?>" placeholder="Website Email">
      </label>
      <div class="note note-error">Website Email</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Default number of items used for pagination"></i>
        <input type="text" name="user_perpage" value="<?php echo $core->perpage;?>" placeholder="Items Per Page">
      </label>
      <div class="note note-error">Items Per Page</div>
    </section>
    <section class="col col-4">
      <label class="input"><i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Default thumbnail width, in px used for resizing avatars"></i>
        <input type="text" name="thumb_w" value="<?php echo $core->thumb_w;?>" placeholder="Thumbnail Width">
      </label>
      <div class="note note-error">Thumbnail Width</div>
    </section>
    <section class="col col-4">
      <label class="input"><i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Default thumbnail height, in px used for resizing avatars"></i>
        <input type="text" name="thumb_h" value="<?php echo $core->thumb_h;?>" placeholder="Thumbnail Height">
      </label>
      <div class="note note-error">Thumbnail Height</div>
    </section>
  </div>
  <hr />
  <div class="row">
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="reg_verify" value="1" <?php getChecked($core->reg_verify, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="reg_verify" value="0" <?php getChecked($core->reg_verify, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Registration Verification <i class="icon-exclamation-sign  tooltip" data-title="If Yes users will need to confirm their email address and go through activation process."></i> </div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="auto_verify" value="1" <?php getChecked($core->auto_verify, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="auto_verify" value="0" <?php getChecked($core->auto_verify, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Auto Registration <i class="icon-exclamation-sign  tooltip" data-title="If Yes, once registration process is completed users will be able to login.<br />If No Admin will need to manually activate each account."></i></div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="reg_allowed" value="1" <?php getChecked($core->reg_allowed, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="reg_allowed" value="0" <?php getChecked($core->reg_allowed, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Allow Registration <i class="icon-exclamation-sign  tooltip" data-title="Enable/Disable User Registration."></i></div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="notify_admin" value="1" <?php getChecked($core->notify_admin, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="notify_admin" value="0" <?php getChecked($core->notify_admin, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Registration Notification <i class="icon-exclamation-sign  tooltip" data-title="Receive notification upon each new user registration."></i></div>
    </section>
  </div>
  <div class="row">
    <section class="col col-2">
      <label class="input"><i class="icon-append icon-exclamation-sign  tooltip" data-title="Limit number of users that are allowed to register 0 = Unlimited"></i>
        <input type="text" name="user_limit" value="<?php echo $core->user_limit;?>" placeholder="User Limit">
      </label>
      <div class="note">User Limit</div>
    </section>
    <section class="col col-2">
      <label class="input"><i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Enter your currency such as CAD, USD, EUR"></i>
        <input type="text" name="currency" value="<?php echo $core->currency;?>" placeholder="Default Currency">
      </label>
      <div class="note note-error">Default Currency</div>
    </section>
    <section class="col col-2">
      <label class="input"><i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Enter your currency symbol such as $, &euro;, &pound;"></i>
        <input type="text" name="cur_symbol" value="<?php echo $core->cur_symbol;?>" placeholder="Currency Symbol">
      </label>
      <div class="note note-error">Currency Symbol</div>
    </section>
    <section class="col col-3">
      <label class="input">
        <input name="logo" type="file" class="fileinput"/>
      </label>
      <div class="note">Company Logo</div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="checkbox">
          <input name="dellogo" type="checkbox" value="1" class="checkbox"/>
          <i></i>Delete Logo</label>
      </div>
      <div class="note">If no logo exists, Site Name will be used instead.</div>
    </section>
  </div>
  <hr />
  <header>Default Mailer</header>
  <div class="row">
    <section class="col col-6">
      <select name="mailer" id="mailerchange">
        <option value="PHP"<?php if ($core->mailer == "PHP") echo " selected=\"selected\"";?>>PHP Mailer</option>
        <option value="SMTP"<?php if ($core->mailer == "SMTP") echo " selected=\"selected\"";?>>SMTP Mailer</option>
      </select>
      <div class="note">Use PHP Mailer or SMTP protocol for sending emails</div>
    </section>
  </div>
  <div class="row showsmtp">
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Specify main SMTP server. E.g.:(mail.yourserver.com)"></i>
        <input type="text" name="smtp_host" value="<?php echo $core->smtp_host;?>" placeholder="SMTP Hostname">
      </label>
      <div class="note note">SMTP Hostname</div>
    </section>
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i>
        <input type="text" name="smtp_user" value="<?php echo $core->smtp_user;?>" placeholder="SMTP Username">
      </label>
      <div class="note">SMTP Username</div>
    </section>
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i>
        <input type="text" name="smtp_pass" value="<?php echo $core->smtp_pass;?>" placeholder="SMTP Password">
      </label>
      <div class="note">SMTP Password</div>
    </section>
  </div>
  <div class="row showsmtp">
    <section class="col col-4">
      <div class="inline-group">
        <label class="label">Requires SSL</label>
        <label class="radio">
          <input type="radio" name="is_ssl" value="1" <?php getChecked($core->is_ssl, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="is_ssl" value="0" <?php getChecked($core->is_ssl, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Choose Yes if your server requires SSL connection</div>
    </section>
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Mail server port ( Can be 25, 26. 456 for GMAIL. 587 for Yahoo ). Ask your host if uncertain."></i>
        <input type="text" name="smtp_port" value="<?php echo $core->smtp_port;?>" placeholder="SMTP Port">
      </label>
      <div class="note">SMTP Port</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Update Configuration<span><i class="icon-ok"></i></span></button>
  </footer>
</form>
<?php echo Core::doForm("processConfig");?> 
<script type="text/javascript">
// <![CDATA[
$(document).ready(function () {
	var res2 = '<?php echo $core->mailer;?>';
		(res2 == "SMTP" ) ? $('.showsmtp').show() : $('.showsmtp').hide();
    $('#mailerchange').change(function () {
		var res = $("#mailerchange option:selected").val();
		(res == "SMTP" ) ? $('.showsmtp').show() : $('.showsmtp').hide();
	});
	
});
// ]]>
</script>