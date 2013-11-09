<?php
  /**
   * Contact Form
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: contact.php, v2.00 2011-04-20 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("init.php");
?>
<?php include("header.php");?>
<p class="bluetip"><i class="icon-lightbulb icon-3x pull-left"></i> Feel free to send us an email with your enquiries, questions, or any feedback.<br />
  We will be very happy to answer your question. Use contact form below to send us quick email.</p>
<div id="fullform">
  <form class="xform" id="admin_form" method="post">
    <header>Contact Request<span>Contact Us</span></header>
    <div class="row">
      <section class="col col-6">
        <label class="input"> <i class="icon-append icon-asterisk"></i>
          <input type="text" name="name" value="<?php if ($user->logged_in) echo $user->name;?>" placeholder="Your Name">
        </label>
        <div class="note note-error">Your Name</div>
      </section>
      <section class="col col-6">
        <label class="input"> <i class="icon-prepend icon-lock"></i> <i class="icon-append icon-asterisk"></i>
          <input type="text" name="email" value="<?php if ($user->logged_in) echo $user->email;?>" placeholder="Email Address">
        </label>
        <div class="note note-error">Email Address</div>
      </section>
    </div>
    <div class="row">
      <section class="col col-6">
        <select name="subject">
          <option value="">--- What's on your mind? ---</option>
          <option value="Compliment">Compliment</option>
          <option value="Criticism">Criticism</option>
          <option value="Suggestion">Suggestion</option>
          <option value="Advertise">Advertise</option>
          <option value="Support">Support</option>
          <option value="Other">Other</option>
        </select>
        <div class="note">Subject</div>
      </section>
      <section class="col col-6">
        <label class="input"> <img src="lib/captcha.php" alt="" class="captcha-append" /> <i class="icon-prepend icon-eye-open"></i>
          <input type="text" name="captcha" placeholder="Captcha Code">
        </label>
        <div class="note">Captcha Code</div>
      </section>
    </div>
    
  <div class="row">
    <section class="col col-12">
      <label class="textarea"> <i class="icon-append icon-asterisk"></i>
        <textarea name="message" placeholder="Message" rows="3"></textarea>
      </label>
      <div class="note note-error">Your Message</div>
    </section>
  </div>
    <footer>
      <button class="button" name="doupdate" type="submit">Submit Inquiry<span><i class="icon-ok"></i></span></button>
    </footer>
  </form>
</div>
<script type="text/javascript">
// <![CDATA[
  function showResponse(msg) {
      hideLoader();
      if (msg == 'OK') {
		  result = "<div class=\"bggreen\"><p><span class=\"icon-ok-sign\"><\/span><i class=\"close icon-remove-circle\"></i><span>Thank you!<\/span>Your message has been sent successfully<\/p><\/div>";
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
          url: "ajax/sendmail.php",
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
<?php include("footer.php");?>