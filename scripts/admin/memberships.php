<?php
  /**
   * Memberships
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: memberships.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
	  
?>
<?php switch(Filter::$action): case "edit": ?>
<?php $row = Core::getRowById(Membership::mTable, Filter::$id);?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can update your membership package<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>Membership Manager<span>Editing Membership <i class="icon-double-angle-right"></i> <?php echo $row->title;?></span></header>
  <div class="row">
    <section class="col col-4">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="title" value="<?php echo $row->title;?>" placeholder="Membership Title">
      </label>
      <div class="note note-error">Membership Title</div>
    </section>
    <section class="col col-2">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="price" value="<?php echo $row->price;?>" placeholder="0.00">
      </label>
      <div class="note note-error">Enter price in 0.00 format</div>
    </section>
    <section class="col col-2">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Period before membership expires.<br />Valid values are:<br />
  	  Day(s) Allowable range is 1 to 90<br />
  	  Week(s) Allowable range is 1 to 52<br />
      Month(s) Allowable range is 1 to 24<br />
      Year(s) Allowable range is 1 to 5"></i>
        <input type="text" name="days" value="<?php echo $row->days;?>" placeholder="1">
      </label>
      <div class="note note-error">Membership Period</div>
    </section>
    <section class="col col-4"> <?php echo $member->getMembershipPeriod($row->period);?>
      <div class="note">Membership Period</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="trial" value="1" <?php getChecked($row->trial, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="trial" value="0" <?php getChecked($row->trial, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Trial Membership <i class="icon-exclamation-sign  tooltip" data-title="Trial Membership will be available for one time use only.<br /> You can only have one trial membership in total."></i> </div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="recurring" value="1" <?php getChecked($row->recurring, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="recurring" value="0" <?php getChecked($row->recurring, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Recurring Payment <i class="icon-exclamation-sign  tooltip" data-title="If Yes system will create recurring subscription."></i></div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="private" value="1" <?php getChecked($row->private, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="private" value="0" <?php getChecked($row->private, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Private Mambership <i class="icon-exclamation-sign  tooltip" data-title="Private memberships are not available to front end users."></i></div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="active" value="1" <?php getChecked($row->active, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="active" value="0" <?php getChecked($row->active, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Active Membership <i class="icon-exclamation-sign  tooltip" data-title="Only active memberships will be available for purchase."></i></div>
    </section>
  </div>
  <hr />
  <div class="row">
    <section class="col col-12">
      <label class="textarea">
        <textarea name="description" placeholder="User Notes" rows="3"><?php echo $row->description;?></textarea>
      </label>
      <div class="note">Membership Description</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Update Membership<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=memberships" class="button button-secondary">Cancel</a> </footer>
  <input name="id" type="hidden" value="<?php echo Filter::$id;?>" />
</form>
<?php echo Core::doForm("processMembership");?>
<?php break;?>
<?php case"add": ?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can add new membership package<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>Membership Manager<span>Adding Membership</span></header>
  <div class="row">
    <section class="col col-4">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="title" placeholder="Membership Title">
      </label>
      <div class="note note-error">Membership Title</div>
    </section>
    <section class="col col-2">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="price" placeholder="0.00">
      </label>
      <div class="note note-error">Enter price in 0.00 format</div>
    </section>
    <section class="col col-2">
      <label class="input"> <i class="icon-prepend icon-asterisk"></i> <i class="icon-append icon-exclamation-sign  tooltip" data-title="Period before membership expires.<br />Valid values are:<br />
  	  Day(s) Allowable range is 1 to 90<br />
  	  Week(s) Allowable range is 1 to 52<br />
      Month(s) Allowable range is 1 to 24<br />
      Year(s) Allowable range is 1 to 5"></i>
        <input type="text" name="days" placeholder="1">
      </label>
      <div class="note note-error">Membership Period</div>
    </section>
    <section class="col col-4"> <?php echo $member->getMembershipPeriod();?>
      <div class="note note-info">Membership Period</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="trial" value="1">
          <i></i>Yes</label>
        <label class="radio">
          <input name="trial" type="radio" value="0" checked="checked" >
          <i></i>No</label>
      </div>
      <div class="note">Trial Membership <i class="icon-exclamation-sign  tooltip" data-title="Trial Membership will be available for one time use only.<br /> You can only have one trial membership in total."></i> </div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="recurring" value="1" >
          <i></i>Yes</label>
        <label class="radio">
          <input name="recurring" type="radio" value="0" checked="checked" >
          <i></i>No</label>
      </div>
      <div class="note">Recurring Payment <i class="icon-exclamation-sign  tooltip" data-title="If Yes system will create recurring subscription."></i></div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="private" value="1" >
          <i></i>Yes</label>
        <label class="radio">
          <input name="private" type="radio" value="0" checked="checked" >
          <i></i>No</label>
      </div>
      <div class="note">Private Mambership <i class="icon-exclamation-sign  tooltip" data-title="Private memberships are not available to front end users."></i></div>
    </section>
    <section class="col col-3">
      <div class="inline-group">
        <label class="radio">
          <input name="active" type="radio" value="1" checked="checked">
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="active" value="0">
          <i></i>No</label>
      </div>
      <div class="note">Active Membership <i class="icon-exclamation-sign  tooltip" data-title="Only active memberships will be available for purchase."></i></div>
    </section>
  </div>
  <hr />
  <div class="row">
    <section class="col col-12">
      <label class="textarea">
        <textarea name="description" placeholder="User Notes" rows="3"></textarea>
      </label>
      <div class="note">Membership Description</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Add Membership<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=memberships" class="button button-secondary">Cancel</a> </footer>
</form>
<?php echo Core::doForm("processMembership");?>
<?php break;?>
<?php default: ?>
<?php $memrow = $member->getMemberships();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Here you can manage your membership packages.<br />
  <strong>Note: Make sure you are not deleting or deactivating memberships assigned to active users.</strong></p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing Membership Packages</h1>
      <aside> <a class="hint--left hint--add hint--always hint--rounded" data-hint="Add Membership" href="index.php?do=memberships&amp;action=add"><span class="icon-plus"></span></a> </aside>
    </div>
  </header>
  <div class="content2">
    <table class="myTable">
      <thead>
        <tr>
          <th class="header">#</th>
          <th class="header">Title</th>
          <th class="header">Price</th>
          <th class="header">Expiry</th>
          <th class="header">Description</th>
          <th class="header">Active</th>
          <th class="header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if(!$memrow):?>
        <tr>
          <td colspan="7"><?php echo Filter::msgAlert('<span>Alert!</span>You don\'t have any membership packages yet...');?></td>
        </tr>
        <?php else:?>
        <?php foreach ($memrow as $row):?>
        <tr>
          <td><?php echo $row->id;?>.</td>
          <td><?php echo $row->title;?></td>
          <td><?php echo $core->formatMoney($row->price);?></td>
          <td><?php echo $row->days . ' ' . $member->getPeriod($row->period);?></td>
          <td><?php echo $row->description;?></td>
          <td><?php echo isActive($row->active);?></td>
          <td><span class="tbicon"> <a href="index.php?do=memberships&amp;action=edit&amp;id=<?php echo $row->id;?>" class="tooltip" data-title="Edit"><i class="icon-pencil"></i></a> </span> <span class="tbicon"> <a id="item_<?php echo $row->id;?>" class="tooltip delete" data-rel="<?php echo $row->title;?>" data-title="Delete"><i class="icon-trash"></i></a> </span></td>
        </tr>
        <?php endforeach;?>
        <?php unset($row);?>
        <?php endif;?>
      </tbody>
    </table>
  </div>
</section>
<?php echo Core::doDelete("Delete Membership","deleteMembership");?>
<?php break;?>
<?php endswitch;?>