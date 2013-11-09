<?php
  /**
   * Page Builder
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: help-admin.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php $memrow = $member->getMemberships();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can build your own custom protected page based on a user membership<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>Page Builder<span>Protecting pages based on user membership package</span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="pagename" placeholder="Page Name">
      </label>
      <div class="note note-error">This is the actual file name of the page. You can name it anything you want, such as platinum_members</div>
    </section>
    <section class="col col-6">
      <div class="inline-group">
        <label class="radio">
          <input name="header" type="radio" value="1" checked="checked" >
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="header" value="0" >
          <i></i>No</label>
      </div>
      <div class="note">If yes default header and footer will be added to this page. You can always manually modify this page content later.</div>
    </section>
  </div>
  <hr />
  <div class="row">
    <section class="col col-6">
      <div class="note note-info">Your new page will be created inside <strong>uploads/</strong> directory. System assumes that you will be placing this page within the root of your initial install, and therefore all the paths and the necessary files will be included inside the page structure.<br />
        Otherwize you will need to manualy adjust paths inside this page if you are placing it outside your MMP directory.</div>
    </section>
    <section class="col col-6">
      <div class="scrollbox" style="min-height:150px">
        <?php if($memrow):?>
        <?php $class = 'odd';?>
        <?php foreach ($memrow as $mlist):?>
        <?php $class = ($class == 'even' ? 'odd' : 'even');?>
        <div class="<?php echo $class;?>">
          <label class="checkbox">
            <input type="checkbox" value="<?php echo $mlist->id;?>" name="membership_id[]">
            <i></i><?php echo $mlist->title;?></label>
        </div>
        <?php endforeach;?>
        <?php unset($mlist);?>
        <?php endif;?>
      </div>
      <div class="note note-error">Select Membership(s)</div>
    </section>
  </div>
  <footer>
    <button class="button" name="dosubmit" type="submit">Build Page<span><i class="icon-ok"></i></span></button>
  </footer>
</form>
<?php echo Core::doForm("processBuilder");?> 