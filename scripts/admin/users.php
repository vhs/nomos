<?php
  /**
   * Users
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: users.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');

$pinObj = ServiceClient::web_PinService1_GetUserPin(CurrentUser::getIdentity());
?>
<?php switch(Filter::$action): case "edit": ?>
<?php $row = Core::getRowById(Users::uTable, Filter::$id);?>
<?php $memrow = $member->getMemberships();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can update your user info<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>User Manager<span>Editing Current User <i class="icon-double-angle-right"></i> <?php echo $row->username;?></span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="username" value="<?php echo $row->username;?>" placeholder="<?php echo $row->username;?>">
      </label>
      <div class="note note-error">Username</div>
    </section>
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-lock"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="password" placeholder="password">
      </label>
      <div class="note note-info">Leave empty unless changing the password</div>
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
  <hr>
  <div class="row">
    <section class="col col-2">
      <select name="membership_id">
        <option value="0">None</option>
        <?php if($memrow):?>
        <?php foreach ($memrow as $mlist):?>
        <?php $selected = ($row->membership_id == $mlist->id) ? " selected=\"selected\"" : "";?>
        <option value="<?php echo $mlist->id;?>"<?php echo $selected;?>><?php echo $mlist->title;?></option>
        <?php endforeach;?>
        <?php unset($mlist);?>
        <?php endif;?>
      </select>
      <div class="note">Membership Access</div>
    </section>
      <section class="col col-2">
          <?php if(!is_null($pinObj)) {
            $spin = explode("|", $pinObj->key);
            $pinid = sprintf("%04s", $spin[0]);
            $pin = sprintf("%04s", $spin[1]); ?>
              <label class="input"> <i class="icon-prepend pinid"><?php echo sprintf("%04s", $pinid); ?></i>
                  <input class="pin" type="text" name="pin" maxlength="4" value="<?php echo sprintf("%04s", $pin); ?>" placeholder="<?php echo sprintf("%04s", $pin); ?>">
              </label>
          <?php } else { ?>
              <label class="input disabled">
                  <input type="text" readonly="readonly" disabled="disabled" placeholder="Must login once">
              </label>
          <?php } ?>
          <div class="note note-error">PIN</div>
      </section>
	    <section class="col col-2">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="vetted" value="1" <?php getChecked($row->vetted, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="vetted" value="0" <?php getChecked($row->vetted, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Vetted For Key</div>
    </section>
	    <section class="col col-2">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="cash" value="1" <?php getChecked($row->cash, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="cash" value="0" <?php getChecked($row->cash, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Cash Member</div>
    </section>

    <section class="col col-2">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="newsletter" value="1" <?php getChecked($row->newsletter, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="newsletter" value="0" <?php getChecked($row->newsletter, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Newsletter Subscriber</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-5">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="active" value="y" <?php getChecked($row->active, "y"); ?>>
          <i></i>Active</label>
        <label class="radio">
          <input type="radio" name="active" value="n" <?php getChecked($row->active, "n"); ?>>
          <i></i>Inactive</label>
        <label class="radio">
          <input type="radio" name="active" value="b" <?php getChecked($row->active, "b"); ?>>
          <i></i>Banned</label>
        <label class="radio">
          <input type="radio" name="active" value="t" <?php getChecked($row->active, "t"); ?>>
          <i></i>Pending</label>
      </div>
      <div class="note">User Status</div>
    </section>
    <section class="col col-5">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="userlevel" value="9" <?php getChecked($row->userlevel, 9); ?>>
          <i></i>Administrator</label>
        <label class="radio">
          <input type="radio" name="userlevel" value="1" <?php getChecked($row->userlevel, 1); ?>>
          <i></i>User</label>
      </div>
      <div class="note">Administration Station</div>
    </section>
    <section class="col col-2"> <img src="../thumbmaker.php?src=<?php echo UPLOADURL;?><?php echo ($row->avatar) ? $row->avatar : "blank.png";?>&amp;w=40&amp;h=40&amp;s=1&amp;a=t1" alt="" title="" class="avatar" /> </section>
  </div>
  <div class="row">
    <section class="col col-3">
      <label class="input state-disabled"> <i class="icon-prepend icon-calendar"></i>
        <input type="text" name="created" disabled="disabled" readonly="readonly" value="<?php echo $row->created;?>" placeholder="Email">
      </label>
      <div class="note">Registration Date</div>
    </section>
    <section class="col col-3">
      <label class="input"> <i class="icon-prepend icon-calendar"></i>
        <input type="text" name="mem_expire" id="enddate" value="<?php echo $row->mem_expire;?>" placeholder="Expiry">
      </label>
      <div class="note">Active Until</div>
    </section>
    <section class="col col-3">
      <label class="input state-disabled"> <i class="icon-prepend icon-calendar"></i>
        <input type="text" name="lastlogin" disabled="disabled" readonly="readonly" value="<?php echo $row->lastlogin;?>" placeholder="First Name">
      </label>
      <div class="note">Last Login</div>
    </section>
    <section class="col col-2">
      <label class="input state-disabled"> <i class="icon-prepend icon-laptop"></i>
        <input type="text" name="lastip" disabled="disabled" readonly="readonly" value="<?php echo $row->lastip;?>" placeholder="Last Name">
      </label>
      <div class="note">Last Login IP</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-12">
      <label class="textarea">
        <textarea name="notes" placeholder="User Notes" rows="3"><?php echo $row->notes;?></textarea>
      </label>
      <div class="note note">User Notes - For internal use only.</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Update User Profile<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=users" class="button button-secondary">Cancel</a> </footer>
  <input name="id" type="hidden" value="<?php echo Filter::$id;?>" />
</form>
<?php echo Core::doForm("processUser");?>
<?php break;?>
<?php case"add": ?>
<?php $memrow = $member->getMemberships();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can add new users<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>User Manager<span>Adding New User</span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-user"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="username" placeholder="Username">
      </label>
      <div class="note note-error">Username</div>
    </section>
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-lock"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="password" placeholder="password">
      </label>
      <div class="note note-error">Password</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-envelope-alt"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="email" placeholder="Email">
      </label>
      <div class="note note-error">Email</div>
    </section>
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-user"></i>
        <input type="text" name="fname" placeholder="First Name">
      </label>
      <div class="note note-error">First Name</div>
    </section>
    <section class="col col-4">
      <label class="input"> <i class="icon-prepend icon-user"></i>
        <input type="text" name="lname" placeholder="Last Name">
      </label>
      <div class="note note-error">Last Name</div>
    </section>
  </div>
  <hr>
  <div class="row">
    <section class="col col-5">
      <select name="membership_id">
        <option value="0">None</option>
        <?php if($memrow):?>
        <?php foreach ($memrow as $mlist):?>
        <option value="<?php echo $mlist->id;?>"><?php echo $mlist->title;?></option>
        <?php endforeach;?>
        <?php unset($mlist);?>
        <?php endif;?>
      </select>
      <div class="note">Membership Access</div>
    </section>
    <section class="col col-4">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="userlevel" value="9">
          <i></i>Administrator</label>
        <label class="radio">
          <input name="userlevel" type="radio" value="1" checked="checked">
          <i></i>User</label>
      </div>
      <div class="note">Administration Station</div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="newsletter" value="1">
          <i></i>Yes</label>
        <label class="radio">
          <input name="newsletter" type="radio" value="0" checked="checked">
          <i></i>No</label>
      </div>
      <div class="note">Newsletter Subscriber</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-5">
      <div class="inline-group">
        <label class="radio">
          <input name="active" type="radio" value="y" checked="checked">
          <i></i>Active</label>
        <label class="radio">
          <input type="radio" name="active" value="n">
          <i></i>Inactive</label>
        <label class="radio">
          <input type="radio" name="active" value="b">
          <i></i>Banned</label>
        <label class="radio">
          <input type="radio" name="active" value="t">
          <i></i>Pending</label>
      </div>
      <div class="note">User Status</div>
    </section>
	    <section class="col col-2">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="cash" value="1" checked="checked">
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="cash" value="0">
          <i></i>No</label>
      </div>
      <div class="note">Cash Member</div>
    </section>
	    <section class="col col-2">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="vetted" value="1">
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="vetted" value="0" checked="checked">
          <i></i>No</label>
      </div>
      <div class="note">Vetted for Key</div>
    </section>
    <section class="col col-3">
      <label class="checkbox">
        <input type="checkbox" name="notify" value="1">
        <i></i>Notify User</label>
      <div class="note note-info">Send welcome email to this user</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-12">
      <label class="textarea">
        <textarea name="notes" placeholder="User Notes" rows="3"></textarea>
      </label>
      <div class="note note">User Notes - For internal use only.</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Add User<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=users" class="button button-secondary">Cancel</a> </footer>
</form>
<?php echo Core::doForm("processUser");?>
<?php break;?>
<?php default:?>
<?php $userrow = $user->getUsers();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Here you can manage your users. <br />
  You can also activate each user account by clicking on <i class="icon-adjust"></i> icon</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing Users</h1>
      <aside> <a class="hint--left hint--add hint--always hint--rounded" data-hint="Add User" href="index.php?do=users&amp;action=add"><span class="icon-plus"></span></a> </aside>
    </div>
  </header>
  <div class="content2">
    <div class="row">
      <div class="ptop30">
        <form class="xform" id="dForm" method="post" style="padding:0;">
          <section class="col col-6">
            <select name="select" id="userfilter">
              <option value="NA">--- Reset User Filter ---</option>
              <?php echo Users::getUserFilter();?>
            </select>
          </section>
          <section class="col col-3"> <?php echo $pager->items_per_page();?> </section>
          <section class="col col-3"> <?php echo $pager->jump_menu();?> </section>
          <div class="hr2"></div>
          <section class="col col-4">
            <label class="input"> <i class="icon-prepend icon-search"></i>
              <input type="text" name="searchuser"  id="search-input" placeholder="Search User" value="<?php if(isset($_POST['searchuser'])) { echo $_POST['searchuser']; } ?>">
            </label>
            <div id="suggestions"></div>
          </section>
          <section class="col col-3">
            <label class="input"> <i class="icon-prepend icon-calendar"></i>
              <input type="text" name="fromdate"  id="fromdate" placeholder="From" value="<?php if(isset($_POST['fromdate'])) { echo $_POST['fromdate']; } ?>">
            </label>
          </section>
          <section class="col col-3">
            <label class="input"> <i class="icon-prepend icon-calendar"></i>
              <input type="text" name="enddate"  id="enddate" placeholder="To" value="<?php if(isset($_POST['enddate'])) { echo $_POST['enddate']; } ?>">
            </label>
          </section>
          <section class="col col-2">
            <button class="button inline" name="find" type="submit">Find<span><i class="icon-chevron-right"></i></span></button>
          </section>
        </form>
      </div>
    </div>
    <table class="myTable">
      <thead>
        <tr>
          <th class="header">#</th>
          <th class="header">Username</th>
          <th class="header">Full Name</th>
          <th class="header">User Status</th>
          <th class="header">Cash</th>
          <th class="header">Membership</th>
          <th class="header">Expires</th>
          <th class="header">Actions</th>
        </tr>
      </thead>
      <tbody>
      <?php if($userrow):?>
        <?php foreach ($userrow as $row):?>
        <tr>
          <td><?php echo $row->id;?>.</td>
          <td><a href="index.php?do=users&amp;action=edit&amp;id=<?php echo $row->id;?>"><?php echo $row->username;?></a></td>
          <td><?php echo $row->name;?></td>
          <td><?php echo userStatus($row->active, $row->id);?></td>
		  <td>
		  <?php if($row->cash): ?>
            <span class="tbicon">
			<a id="item_<?php echo $row->id;?>" class="tooltip cash" data-title="Yes"><i class="icon-check"></i></a> </span>
		  <?php else:?>&nbsp;<?php endif;?>
		  </td>
          <td><?php if(!$row->membership_id):?>
            --/--
            <?php else:?>
            <a href="index.php?do=memberships&amp;action=edit&amp;id=<?php echo $row->mid;?>"><?php echo $row->title;?></a>
            <?php endif;?></td>
          <td><?php echo $row->mem_expire;?></td>
          <td>
          <span class="tbicon"> 
          <a href="index.php?do=newsletter&amp;emailid=<?php echo urlencode($row->email);?>" class="tooltip" data-title="Mail"><i class="icon-envelope"></i></a> </span>
            <?php if($row->id == 1):?>
            <span class="tbicon"> <a id="item_<?php echo $row->id;?>" class="tooltip" data-rel="<?php echo $row->username;?>" data-title="Master Admin"><i class="icon-lock"></i></a> </span>
            <?php else:?>
            <span class="tbicon"> <a id="item_<?php echo $row->id;?>" class="tooltip delete" data-rel="<?php echo $row->username;?>" data-title="Delete"><i class="icon-trash"></i></a> </span>
            <?php endif;?></td>
        </tr>
        <?php endforeach;?>
        <?php unset($row);?>
        <?php endif;?>
      </tbody>
    </table>
    <?php echo $pager->display_pages();?>
    </div>
</section>
<?php echo Core::doDelete("deleteUser","deleteUser");?> 
<script type="text/javascript"> 
// <![CDATA[
$(document).ready(function () {
    $('a.activate').on('click', function () {
        var uid = $(this).attr('id').replace('act_', '')
        var text = "<i class=\"icon-warning-sign icon-3x pull-left\"></i>Are you sure you want to activate this user account?<br /><strong>Email notification will be sent as well</strong>";
        new Messi(text, {
            title: "Activate User Account",
            modal: true,
            closeButton: true,
            buttons: [{
                id: 0,
                label: "Activate",
                val: 'Y'
            }],
			  callback: function (val) {
				  $.ajax({
					  type: 'post',
					  url: "controller.php",
					  data: {
						  activateAccount: 1,
						  id: uid,
					  },
					  cache: false,
					  beforeSend: function () {
						  showLoader();
					  },
					  success: function (msg) {
						  hideLoader();
						  $("#msgholder").html(msg);
						  $('html, body').animate({
							  scrollTop: 0
						  }, 600);
					  }
				  });
			  }
        });
    });

    $("#search-input").on("keyup", function () {
        var srch_string = $(this).val();
        var data_string = 'userSearch=' + srch_string;
        if (srch_string.length > 0) {
            $.ajax({
                type: "POST",
                url: "controller.php",
                data: data_string,
                beforeSend: function () {
                    $('#search-input').addClass('loading');
                },
                success: function (res) {
                    $('#suggestions').html(res).show();
                    $("input").blur(function () {
                        $('#suggestions').fadeOut();
                    });
                    if ($('#search-input').hasClass("loading")) {
                        $("#search-input").removeClass("loading");
                    }
                }
            });
        }
        return false;
    });
	
    var dates = $('#fromdate, #enddate').datepicker({
        defaultDate: "+1w",
        changeMonth: false,
        numberOfMonths: 2,
        dateFormat: 'yy-mm-dd',
        onSelect: function (selectedDate) {
            var option = this.id == "fromdate" ? "minDate" : "maxDate";
            var instance = $(this).data("datepicker");
            var date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });
});
// ]]>
</script>
<?php break;?>
<?php endswitch;?>