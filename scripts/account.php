<?php
  /**
   * Account Profile
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: account.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("init.php");
  
  if (!$user->logged_in)
      redirect_to("index.php");
	  
  $row = $user->getUserData();
  $mrow = $user->getUserMembership();
  $gatelist = $member->getGateways(true);
  $listpackrow = $member->getMembershipListFrontEnd();
?>
<?php include("header.php");?>
<p class="bluetip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can update your user info<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>Manage Your Account<span>User Account Edit <i class="icon-double-angle-right"></i> <?php echo $row->username;?></span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input state-disabled"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="username" disabled="disabled" readonly="readonly" value="<?php echo $row->username;?>" placeholder="<?php echo $row->username;?>">
      </label>
      <div class="note note-error">Username</div>
    </section>
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-lock"></i> <i class="icon-append icon-asterisk"></i>
        <input type="password" name="password" placeholder="********">
      </label>
      <div class="note note-info">Leave empty unless changing passwords</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-4">
      <label class="input state-disabled"> <i class="icon-prepend icon-envelope-alt"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" readonly="readonly" disabled="disabled" name="email" value="<?php echo $row->email;?>" placeholder="Email">
      </label>
      <div class="note note-error">Registration Email</div>
    </section>
    <section class="col col-4">
      <label class="input state-disabled"> <i class="icon-prepend icon-user"></i>
        <input type="text" readonly="readonly" disabled="disabled" name="fname" value="<?php echo $row->fname;?>" placeholder="First Name">
      </label>
      <div class="note note-error">First Name</div>
    </section>
    <section class="col col-4">
      <label class="input state-disabled"> <i class="icon-prepend icon-user"></i>
        <input type="text" readonly="readonly" disabled="disabled" name="lname" value="<?php echo $row->lname;?>" placeholder="Last Name">
      </label>
      <div class="note note-error">Last Name</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-2">
      <label class="radio">
        <input type="radio" name="newsletter" value="1" <?php getChecked($row->newsletter, 1); ?>>
        <i></i>Yes</label>
      <label class="radio">
        <input type="radio" name="newsletter" value="0" <?php getChecked($row->newsletter, 0); ?>>
        <i></i>No</label>
      <div class="note">Newsletter Subscriber</div>
    </section>

      <section class="col col-2">
          <?php if($row->lastlogin > '0000-00-00 00:00:00') { ?>
              <label class="input"> <i class="icon-prepend pinid"><?php echo sprintf("%04s", $row->pinid); ?></i>
                  <input class="pin" type="text" name="pin" maxlength="4" value="<?php echo sprintf("%04s", $row->pin); ?>" placeholder="<?php echo sprintf("%04s", $row->pin); ?>">
              </label>
          <?php } else { ?>
              <label class="input disabled">
                  <input type="text" readonly="readonly" disabled="disabled" placeholder="Must login once">
              </label>
          <?php } ?>
          <div class="note note-error">PIN</div>
      </section>
    <section class="col col-5">
      <img src="badges/laser.png"  height="42" width="42" />
      <div class="note">Badges</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-6">
      <label class="input state-disabled"> <i class="icon-prepend icon-calendar"></i>
        <input type="text" name="created" disabled="disabled" readonly="readonly" value="<?php echo $row->cdate;?>" placeholder="Email">
      </label>
      <div class="note">Registration Date:</div>
    </section>
    <section class="col col-6">
      <label class="input state-disabled"> <i class="icon-prepend icon-calendar"></i>
        <input type="text" name="lastlogin" disabled="disabled" readonly="readonly" value="<?php echo $row->ldate;?>" placeholder="First Name">
      </label>
      <div class="note">Last Login</div>
    </section>
  </div>
  <footer>
    <button class="button" name="doupdate" type="submit">Update Profile<span><i class="icon-ok"></i></span></button>
  </footer>
</form>
<table class="myTable">
<thead>
  <tr>
    <th><strong>Current Membership</strong></th>
    <th><strong>Valid Until</strong></th>
  </tr>
  </thead>
  <?php if($row->membership_id == 0) :?>
  <tr>
    <td>No Membership</td>
    <td>--/--</td>
  </tr>
  <?php else:?>
  <tr>
    <td><strong> <?php echo $mrow->title;?> </strong></td>
    <td><strong> <?php echo $mrow->expiry;?> </strong></td>
  </tr>
  <?php endif;?>
</table>
<?php if($listpackrow):?>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Select Your Membership</h1>
    </div>
  </header>
  <div class="content2">
    <ul id="plans">
      <?php foreach ($listpackrow as $prow):?>
      <li class="plan">
        <h2><?php echo $prow->title;?></h2>
        <p class="price"><?php echo $core->formatMoney($prow->price);?> / <span><?php echo $prow->days . ' ' .$member->getPeriod($prow->period);?></span></p>
        <p class="recurring"><?php echo ($prow->recurring) ? 'Yes' : 'No';?></p>
        <p class="desc"><?php echo $prow->description;?></p>
        <?php if($prow->price == 0):?>
        <p class="pbutton"><a class="add-cart" data-id="item_<?php echo $prow->id.':FREE';?>">Activate Membership</a></p>
        <?php else:?>
        <?php if($gatelist):?>
        <?php foreach($gatelist as $grow):?>
        <?php if ($grow->active):?>
        <p class="pbutton"><a class="add-cart" data-id="item_<?php echo $prow->id.':'.$grow->id;?>"><i class="icon-dollar pull-left"></i> <?php echo $grow->displayname;?> </a></p>
        <?php endif;?>
        <?php endforeach;?>
        <?php endif;?>
        <?php endif;?>
      </li>
      <?php endforeach;?>
    </ul>
    <div id="show-result"> </div>
    <?php endif;?>
  </div>
</section>
<?php echo Core::doForm("processUser","ajax/controller.php");?> 
<script type="text/javascript">
// <![CDATA[
$(document).ready(function () {
    $("#plans").gridalicious({
        selector: 'li',
        width: 200,
        animate: true
    });
    $("body").on("click", "a.add-cart", function () {
        $.ajax({
            type: "POST",
            url: "ajax/controller.php",
            data: 'addtocart=' + $(this).attr('data-id').replace('item_', ''),
            success: function (msg) {
                $("#show-result").html(msg);

            }
        });
        return false;
    });
});
// ]]>
</script>
<?php include("footer.php");?>