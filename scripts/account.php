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
        <input type="text" disabled="disabled" name="username" readonly="readonly" value="<?php echo $row->username;?>" placeholder="Username">
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
      <label class="input"> <i class="icon-prepend icon-envelope-alt"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="email" value="<?php echo $row->email;?>" placeholder="Email">
      </label>
      <div class="note note-error">Email</div>
    </section>
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-user"></i>
        <input type="text" name="fname" value="<?php echo $row->fname;?>" placeholder="First Name">
      </label>
      <div class="note note-error">First Name</div>
    </section>
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-user"></i>
        <input type="text" name="lname" value="<?php echo $row->lname;?>" placeholder="Last Name">
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
		<select name="rfid">
			<?php
			$rfidCurrent = $RFID->getRFID($row->id);
			$rfidLogs = $RFID->getLatest();
			
			print("<option value=\"$rfidCurrent\">**$rfidCurrent**</option>\n");
			if(is_array($rfidLogs)) {
				foreach($rfidLogs as $value) {
					print("<option value=\"$value\">$value</option>");
				}
			}
			/*
			<option value="0">asdfghj</option>
			<option value="8">sdfghjk</option>
			<option value="6">fvgbnm</option>
            <option value="7">dfgh</option>
			*/
			?>
        </select>

      <div class="note">RFID Key</div>
    </section>
    <section class="col col-5">
      <img src="badges/laser.png"  height="42" width="42" />
      <div class="note">Badges</div>
    </section>
    <section class="col col-3"> <img src="thumbmaker.php?src=<?php echo UPLOADURL;?><?php echo ($row->avatar) ? $row->avatar : "blank.png";?>&amp;w=<?php echo $core->thumb_w;?>&amp;h=<?php echo $core->thumb_h;?>&amp;s=1&amp;a=t1" alt="" title="" class="avatar" /> </section>
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