<?php
  /**
   * Transactions
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: transactions.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php switch(Filter::$action): case "salesyear": ?>
<?php break;?>
<?php default: ?>
<?php $transrow = $member->getPayments();?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Here you can view all your payment transactions. <br />
  You can also search transaction record based on the unique transaction id.</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Viewing Transaction Records</h1>
      <aside> <a class="hint--left hint--add hint--always hint--rounded" data-hint="Export To Excel Format" href="controller.php?exportTransactions"><span class="icon-table"></span></a> </aside>
    </div>
  </header>
  <div class="content2">
    <div class="row">
      <div class="ptop30">
        <form class="xform" id="dForm" method="post" style="padding:0;">
          <section class="col col-6">
            <select name="select" id="userfilter">
              <option value="NA">-- Reset Payment Filter --</option>
              <?php echo Membership::getPaymentFilter();?>
            </select>
          </section>
          <section class="col col-3"> <?php echo $pager->items_per_page();?> </section>
          <section class="col col-3"> <?php echo $pager->jump_menu();?> </section>
          <div class="hr2"></div>
          <section class="col col-4">
            <label class="input"> <i class="icon-prepend icon-search"></i>
              <input type="text" name="serachtrans" id="search-input" placeholder="Search Transaction">
            </label>
            <div id="suggestions"></div>
          </section>
          <section class="col col-3">
            <label class="input"> <i class="icon-prepend icon-calendar"></i>
              <input type="text" name="fromdate"  id="fromdate" placeholder="From">
            </label>
          </section>
          <section class="col col-3">
            <label class="input"> <i class="icon-prepend icon-calendar"></i>
              <input type="text" name="enddate"  id="enddate" placeholder="To">
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
          <th class="header">Membership Title</th>
          <th class="header">Username</th>
          <th class="header">Amount</th>
          <th class="header">Payment Date</th>
          <th class="header">Processor</th>
          <th class="header">Status</th>
          <th class="header">Delete</th>
        </tr>
      </thead>
      <tbody>
        <?php if($transrow == 0):?>
        <tr>
          <td colspan="8"><?php echo Filter::msgAlert('<span>Alert!</span>You don\'t have any transactions yet...',false);?></td>
        </tr>
        <?php else:?>
        <?php foreach ($transrow as $row):?>
        <tr>
          <td><?php echo $row->id;?>.</td>
          <td><?php echo $row->title;?></td>
          <td><a href="index.php?do=users&amp;action=edit&amp;id=<?php echo $row->user_id;?>"><?php echo $row->username;?></a></td>
          <td><?php echo $core->formatMoney($row->rate_amount);?></td>
          <td><?php echo $row->created;?></td>
          <td><?php echo $row->pp;?></td>
          <td><?php if($row->status == 1):?>
            <span class="tbicon"> <a class="tooltip" data-title="Completed"><i class="icon-ok-sign"></i></a> </span>
            <?php else:?>
            <span class="tbicon"> <a class="tooltip" data-title="Pending"><i class="icon-time"></i></a> </span>
            <?php endif;?></td>
          <td><span class="tbicon"> <a id="item_<?php echo $row->id;?>" class="tooltip delete" data-rel="<?php echo $row->created;?>" data-title="Delete"><i class="icon-trash"></i></a> </span></td>
        </tr>
        <?php endforeach;?>
        <?php unset($row);?>
        <?php if($pager->items_total >= $pager->items_per_page):?>
        <tr style="background-color:transparent">
          <td colspan="8"><div class="pagination"><span class="inner"><?php echo $pager->display_pages();?></span></div></td>
        </tr>
        <?php endif;?>
        <?php endif;?>
      </tbody>
    </table>
  </div>
</section>
<?php echo Core::doDelete("Delete Transaction","deleteTransaction");?> 
<script type="text/javascript"> 
// <![CDATA[
$(document).ready(function () {
    $("#search-input").on("keyup", function () {
        var srch_string = $(this).val();
        var data_string = 'transSearch=' + srch_string;
        if (srch_string.length > 3) {
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
		onSelect: function(selectedDate) {
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