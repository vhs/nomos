<?php
  /**
   * Gateways
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: gateways.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php switch(Filter::$action): case "edit": ?>
<?php $row = Core::getRowById(Membership::gTable, Filter::$id);?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can update your gateway settings<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>
    <div class="row">
      <section class="col col-6"> Gateway Manager<span>Editing Gateway <i class="icon-double-angle-right"></i> <?php echo $row->displayname;?></span> </section>
      <section class="col col-6">
        <div><a class="viewtip flright"><i class="icon-question-sign icon-2x"></i></a></div>
      </section>
    </div>
  </header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="displayname" value="<?php echo $row->displayname;?>" placeholder="Gateway Name">
      </label>
      <div class="note note-error"> Gateway Name</div>
    </section>
    <section class="col col-6">
      <label class="input">
        <input type="text" name="extra" value="<?php echo $row->extra;?>" placeholder="<?php echo $row->extra_txt;?>">
      </label>
      <div class="note note"><?php echo $row->extra_txt;?></div>
    </section>
  </div>
  <div class="row">
    <section class="col col-6">
      <label class="input">
        <input type="text" name="extra2" value="<?php echo $row->extra2;?>" placeholder="<?php echo $row->extra_txt2;?>">
      </label>
      <div class="note"><?php echo $row->extra_txt2;?></div>
    </section>
    <section class="col col-6">
      <label class="input">
        <input type="text" name="extra3" value="<?php echo $row->extra3;?>" placeholder="<?php echo $row->extra_txt3;?>">
      </label>
      <div class="note note"><?php echo $row->extra_txt3;?></div>
    </section>
  </div>
  <section>
    <div class="row">
      <div class="col col-6">
        <label class="label">Set Live Mode</label>
        <label class="radio">
          <input type="radio" name="demo" value="1" <?php getChecked($row->demo, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="demo" value="0" <?php getChecked($row->demo, 0); ?>>
          <i></i>No</label>
        <div class="note note">When in live mode all transactions will be processed in real time</div>
      </div>
      <div class="col col-6">
        <label class="label">Active</label>
        <label class="radio">
          <input type="radio" name="active" value="1" <?php getChecked($row->active, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="active" value="0" <?php getChecked($row->active, 0); ?>>
          <i></i>No</label>
        <div class="note note">Only active gateways will be available for payment methods.</div>
      </div>
    </div>
  </section>
  <hr />
  <div class="row">
    <section class="col col-6">
      <label class="input state-disabled">
        <input type="text" disabled="disabled" value="<?php echo SITEURL.'/gateways/'.$row->dir.'/ipn.php';?>" readonly="readonly">
      </label>
      <div class="note">IPN Url</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Update Gateway<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=gateways" class="button button-secondary">Cancel</a> </footer>
  <input name="id" type="hidden" value="<?php echo Filter::$id;?>" />
</form>
<div id="showhelp" style="display:none"><?php echo cleanOut($row->info);?></div>
<script type="text/javascript"> 
// <![CDATA[
$(document).ready(function () {
	$('a.viewtip').on('click', function () {
		var text = $("#showhelp").html();
		new Messi(text, {
			title: "<?php echo $row->displayname;?>"
		});
	});
});
// ]]>
</script> 
<?php echo Core::doForm("processGateway");?>
<?php break;?>
<?php default: ?>
<?php $gaterow = $member->getGateways();?>
<p class="greentip"><i class="icon-lightbulb icon-2x pull-left"></i>Here you can manage your list of available gateways.</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing Payment Gateways</h1>
    </div>
  </header>
  <div class="content2">
    <table class="myTable">
      <thead>
        <tr>
          <th class="header">#</th>
          <th class="header">Gateway Name</th>
          <th class="header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if(!$gaterow):?>
        <tr>
          <td colspan="3"><?php echo Filter::msgError('<span>Error!</span>Your are missing all gateways. You need to reinstall them manually',false);?></td>
        </tr>
        <?php else:?>
        <?php foreach ($gaterow as $row):?>
        <tr>
          <td><?php echo $row->id;?>.</td>
          <td><?php echo $row->displayname;?></td>
          <td><span class="tbicon"> <a href="index.php?do=gateways&amp;action=edit&amp;id=<?php echo $row->id;?>" class="tooltip" data-title="Edi: <?php echo $row->displayname;?>t"><i class="icon-pencil"></i></a> </span></td>
        </tr>
        <?php endforeach;?>
        <?php unset($row);?>
        <?php endif;?>
      </tbody>
    </table>
  </div>
</section>
<?php break;?>
<?php endswitch;?>