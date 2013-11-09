<?php
  /**
   * News Manager
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: news.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php switch(Filter::$action): case "edit": ?>
<?php $row = Core::getRowById(Core::nTable, Filter::$id);?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can update your news announcement<br>
  Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>News Manager<span>Editing News Announcement <i class="icon-double-angle-right"></i> <?php echo $row->title;?></span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="title" value="<?php echo $row->title;?>" placeholder="News Title">
      </label>
      <div class="note note-error">News Title</div>
    </section>
    <section class="col col-6">
      <label class="input">
        <input type="text" name="author" value="<?php echo $row->author;?>" placeholder="News Author">
      </label>
      <div class="note">News Author</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-calendar"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="created" value="<?php echo $row->created;?>" id="date" placeholder="Date Created">
      </label>
      <div class="note note-error">Date Created</div>
    </section>
    <section class="col col-6">
      <div class="inline-group">
        <label class="radio">
          <input type="radio" name="active" value="1" <?php getChecked($row->active, 1); ?>>
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="active" value="0" <?php getChecked($row->active, 0); ?>>
          <i></i>No</label>
      </div>
      <div class="note">Published</div>
    </section>
  </div>
  <section>
    <div class="field-wrap wysiwyg-wrap">
      <textarea name="body" cols="30" rows="10" class="post"><?php echo $row->body;?></textarea>
    </div>
  </section>
  <footer>
    <button class="button" name="dosubmit" type="submit">Update News<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=news" class="button button-secondary">Cancel</a> </footer>
  <input name="id" type="hidden" value="<?php echo Filter::$id;?>" />
</form>
<?php echo Core::doForm("processNews");?> 
<script type="text/javascript">
  $(document).ready(function() {
    $("#date").datepicker({
        dateFormat: 'yy-mm-dd'
    });
});
</script>
<?php break;?>
<?php case "add":?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can add your news announcement. Fields marked <i class="icon-append icon-asterisk"></i> are required.</p>
<form class="xform" id="admin_form" method="post">
  <header>News Manager<span>Adding News Announcement</span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="title" placeholder="News Title">
      </label>
      <div class="note note-error">News Title</div>
    </section>
    <section class="col col-6">
      <label class="input">
        <input type="text" name="author" placeholder="News Author">
      </label>
      <div class="note">News Author</div>
    </section>
  </div>
  <div class="row">
    <section class="col col-6">
      <label class="input"> <i class="icon-prepend icon-calendar"></i> <i class="icon-append icon-asterisk"></i>
        <input type="text" name="created" value="<?php echo date('Y-m-d');?>" id="date" placeholder="Date Created">
      </label>
      <div class="note note-error">Date Created</div>
    </section>
    <section class="col col-6">
      <div class="inline-group">
        <label class="radio">
          <input name="active" type="radio" value="1" checked="checked" >
          <i></i>Yes</label>
        <label class="radio">
          <input type="radio" name="active" value="0" >
          <i></i>No</label>
      </div>
      <div class="note">Published</div>
    </section>
  </div>
  <section>
    <div class="field-wrap wysiwyg-wrap">
      <textarea name="body" cols="30" rows="10" class="post"></textarea>
    </div>
  </section>
  <footer>
    <button class="button" name="dosubmit" type="submit">Add News<span><i class="icon-ok"></i></span></button>
    <a href="index.php?do=news" class="button button-secondary">Cancel</a> </footer>
</form>
<?php echo Core::doForm("processNews");?> 
<script type="text/javascript">
  $(document).ready(function() {
    $("#date").datepicker({
        dateFormat: 'yy-mm-dd'
    });
});
</script>
<?php break;?>
<?php default: ?>
<?php $newsrow = $core->getNews();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Here you can manage you news announcements.<br />
  Note only one news announcement will be visible to front end users at the time</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing News Announcements</h1>
      <aside> <a class="hint--left hint--add hint--always hint--rounded" data-hint="Add News" href="index.php?do=news&amp;action=add"><span class="icon-plus"></span></a> </aside>
    </div>
  </header>
  <div class="content2">
    <table class="myTable">
      <thead>
        <tr>
          <th class="header">#</th>
          <th class="header">News Name</th>
          <th class="header">Created</th>
          <th class="header">Author</th>
          <th class="header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <?php if(!$newsrow):?>
        <tr>
          <td colspan="5"><?php echo Filter::msgAlert("<span>Alert!</span>You don't have any news announcements yet...",false);?></td>
        </tr>
        <?php else:?>
        <?php foreach ($newsrow as $row):?>
        <tr>
          <td><?php echo $row->id;;?>.</td>
          <td><?php echo $row->title;?></td>
          <td><?php echo $row->cdate;?></td>
          <td><?php echo $row->author;?></td>
          <td><span class="tbicon"> <a href="index.php?do=news&amp;action=edit&amp;id=<?php echo $row->id;?>" class="tooltip" data-title="Edit"><i class="icon-pencil"></i></a> </span> <span class="tbicon"> <a id="item_<?php echo $row->id;?>" class="tooltip delete" data-rel="<?php echo $row->title;?>" data-title="Delete"><i class="icon-trash"></i></a> </span></td>
        </tr>
        <?php endforeach;?>
        <?php unset($row);?>
        <?php endif;?>
      </tbody>
    </table>
  </div>
</section>
<?php echo Core::doDelete("Delete News","deleteNews");?>
<?php break;?>
<?php endswitch;?>