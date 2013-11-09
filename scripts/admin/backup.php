<?php
  /**
   * Backup
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: backup.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php
  require_once(BASEPATH . "lib/class_dbtools.php");
  Registry::set('dbTools',new dbTools());
  $tools = Registry::get("dbTools");
  
  if (isset($_GET['backupok']) && $_GET['backupok'] == "1")
      Filter::msgOk('<span>Success!</span>Backup created successfully!',1,1);

  if (isset($_GET['restore']) && $_GET['restore'] == "1")
      Filter::msgOk('<span>Success!</span>Database restored successfully!',1,1);
	    
  if (isset($_GET['create']) && $_GET['create'] == "1")
      $tools->doBackup('',false);

  if (isset($_POST['backup_file']))
      $tools->doRestore($_POST['backup_file']);
?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Make sure your database is backed up frequently. Click on Create backup to manually backup your database.<br />
  The backups are stored in the [<strong>/admin/backups/</strong>] folder and can be downloaded from the list below. <br />
  Your most recent backup is highlighted. Make sure you download your most recent backup, and delete the rest.</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing Backups</h1>
      <aside> <a class="hint--left hint--add hint--always hint--rounded" data-hint="Create Backup" href="index.php?do=backup&amp;create=1"><span class="icon-plus"></span></a> </aside>
    </div>
  </header>
  <div class="content2">
    <?php
    $dir = BASEPATH . 'admin/backups/';
    if (is_dir($dir)):
        $getDir = dir($dir);
        while (false !== ($file = $getDir->read())):
            if ($file != "." && $file != ".." && $file != "index.php"):
                  $latest =  ($file == $core->backup) ? " db-latest" : "";
                  echo '<div class="db-backup' . $latest . '" id="item_' . $file . '"><i class="icon-hdd pull-left icon-4x icon-white"></i>';
                  echo '<span>' . getSize(filesize(BASEPATH . 'admin/backups/' . $file)) . '</span>';
                  
                  echo '<a class="delete">
                  <small class="sdelet tooltip" data-title="Delete: '. $file . '"><i class="icon-trash icon-white"></i></small></a>';
                  
                  echo '<a href="' . ADMINURL . '/backups/' . $file . '">
                  <small class="sdown tooltip" data-title="Download"><i class="icon-download-alt icon-white"></i></small></a>';
                  
                  echo '<a class="restore">
				  <small class="srestore tooltip" data-title="Restore: '. $file . '"><i class="icon-refresh icon-white"></i></small></a>';
                  echo '<p>' . str_replace(".sql", "", $file) . '</p>';
                  
                  echo '</div>';
            endif;
        endwhile;
        $getDir->close();
    endif;
  ?>
  </div>
</section>
<script type="text/javascript"> 
// <![CDATA[
$(document).ready(function () {
    $('a.delete').on('click', function () {
        var parent = $(this).closest('div');
        var id = parent.attr('id').replace('item_', '')
        var title = $(this).attr('data-rel');
        var text = "<div><i class=\"icon-warning-sign icon-2x pull-left\"></i>Are you sure you want to delete this record?<br /><strong>This action cannot be undone!!!</strong></div>";
        new Messi(text, {
            title: "Delete Database Backup",
            modal: true,
            closeButton: true,
            buttons: [{
                id: 0,
                label: "Delete",
                val: 'Y'
            }],
            callback: function (val) {
                if (val === "Y") {
					$.ajax({
						type: 'post',
						url: "controller.php",
						data: 'deleteBackup=' + id,
						beforeSend: function () {
							parent.animate({
								'backgroundColor': '#FFBFBF'
							}, 400);
						},
						success: function (msg) {
							parent.fadeOut(400, function () {
								parent.remove();
							});
							$("html, body").animate({
								scrollTop: 0
							}, 600);
							$("#msgholder").html(msg);
						}
					});
                }
            }
        })
    });
	
    $('a.restore').on('click', function () {
        var parent = $(this).closest('div');
        var id = parent.attr('id').replace('item_', '')
        var title = $(this).attr('data-rel');
        var text = "<div><i class=\"icon-warning-sign icon-2x pull-left\"></i>Are you sure you want to restore databse?<br /><strong>This action cannot be undone!!!</strong></div>";
        new Messi(text, {
            title: "Restore Database",
            modal: true,
            closeButton: true,
            buttons: [{
                id: 0,
                label: "Restore Database",
                val: 'Y'
            }],
            callback: function (val) {
                if (val === "Y") {
					$.ajax({
						type: 'post',
						url: "controller.php",
						data: 'restoreBackup=' + id,
						success: function (msg) {
							parent.effect('highlight', 1500);
							$("html, body").animate({
								scrollTop: 0
							}, 600);
							$("#msgholder").html(msg);
						}
					});
                }
            }
        })
    });
});
// ]]>
</script>