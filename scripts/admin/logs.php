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
?>
<?php $userrow = $user->getUsers();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Here you view tool usage logs. <br />
  You can filter tool by TODO: FIX clicking on <i class="icon-adjust"></i> icon</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing Logs</h1>
    </div>
  </header>
  <div class="content2">
    <div class="row">
      <div class="ptop30">
        <form class="xform" id="dForm" method="post" style="padding:0;">
          <section class="col col-6">
            <select name="select" id="userfilter">
              <option value="NA">--- Reset Log Filter ---</option>
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
          <section class="col col-2">
            <label class="input"> <i class="icon-prepend icon-calendar"></i>
              <input type="text" name="fromdate"  id="fromdate" placeholder="From" value="<?php if(isset($_POST['fromdate'])) { echo $_POST['fromdate']; } ?>">
            </label>
          </section>
          <section class="col col-2">
            <label class="input"> <i class="icon-prepend icon-calendar"></i>
              <input type="text" name="enddate"  id="enddate" placeholder="To" value="<?php if(isset($_POST['enddate'])) { echo $_POST['enddate']; } ?>">
            </label>
          </section>
          <section class="col col-2">
            <label class="input"> <i class="icon-prepend"></i>
              <input type="text" name="result"  id="result" placeholder="Result" value="<?php if(isset($_POST['enddate'])) { echo $_POST['enddate']; } ?>">
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
          <th class="header">Tool</th>
          <th class="header">User</th>
          <th class="header">Result</th>
          <th class="header">Time</th>
          <th class="header">Actions</th>
        </tr>
      </thead>
      <tbody>
      <?php if($userrow):?>
        <?php foreach ($userrow as $row):?>
        <tr>
          <td><?php echo $row->id;?>.</td>
          <td><?php echo $row->name;?></td>
          <td><a href="index.php?do=users&amp;action=edit&amp;id=<?php echo $row->id;?>"><?php echo $row->name;?></a></td>
          <td><?php echo userStatus($row->active, $row->id);?></td>
        
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