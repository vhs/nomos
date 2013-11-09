<?php
  /**
   * Email Templates
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: templates.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php switch(Filter::$action): case "edit": ?>
<?php $row = Core::getRowById(Core::eTable, Filter::$id);?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can update your email template<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>Email Template Manager<span>Editing Email Template <i class="icon-double-angle-right"></i> <?php echo $row->name;?></span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="name" value="<?php echo $row->name;?>" placeholder="Template Title">
      </label>
      <div class="note note-error">Template Title</div>
    </section>
    <section class="col col-6">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="subject" value="<?php echo $row->subject;?>" placeholder="Email Subject">
      </label>
      <div class="note note-error">Email Subject</div>
    </section>
  </div>
  <hr>
  <div class="row">
    <section class="col col-12">
      <label class="textarea">
        <textarea name="help" rows="3"><?php echo $row->help;?></textarea>
      </label>
      <div class="note">Description</div>
    </section>
  </div>
  <section>
    <div class="field-wrap wysiwyg-wrap">
      <textarea class="post" name="body" rows="15" cols="30"><?php echo $row->body;?></textarea>
    </div>
    <div class="label2 label-important">Do Not Replace Variables Between [ ]</div>
  </section>
  <footer>
    <button class="button" name="dosubmit" type="submit">Update Template<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=templates" class="button button-secondary">Cancel</a> </footer>
  <input name="id" type="hidden" value="<?php echo Filter::$id;?>" />
</form>
<?php echo Core::doForm("processEmailTemplate");?>
<?php break;?>
<?php default: ?>
<?php $temprow = $core->getEmailTemplates();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Below are your email templates. You can modify content of template(s) to suit your needs</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing Email Templates</h1>
    </div>
  </header>
  <div class="content2">
    <table class="myTable">
      <thead>
        <tr>
          <th class="header">#</th>
          <th class="header">Template Name</th>
          <th class="header">Description</th>
          <th class="header">Edit</th>
        </tr>
      </thead>
      <tbody>
        <?php if(!$temprow):?>
        <tr>
          <td colspan="4"><?php echo Filter::msgError("<span>Error!</span>Your are missing all email templates. You need to reinstall them manually",false);?></td>
        </tr>
        <?php else:?>
        <?php foreach ($temprow as $row):?>
        <tr>
          <th><?php echo $row->id;?>.</th>
          <td class="nowrap"><?php echo $row->name;?></td>
          <td><?php echo $row->help;?></td>
          <td><span class="tbicon"> <a href="index.php?do=templates&amp;action=edit&amp;id=<?php echo $row->id;?>" class="tooltip" data-title="Edit"><i class="icon-pencil"></i></a> </span></td>
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