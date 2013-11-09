<?php
  /**
   * Main
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: main.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php $reports = $core->yearlyStats();?>
<?php $row = $core->getYearlySummary();?>
<script type="text/javascript" src="../assets/js/flot/jquery.flot.min.js"></script>
<script type="text/javascript" src="../assets/js/flot/jquery.flot.resize.min.js"></script>
<script type="text/javascript" src="../assets/js/flot/excanvas.min.js"></script>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i>Here you can view your latest user statistics.<br />
  such as lates transactions, number of rwgistered users etc...</p>
<div class="row grid_24">
  <div class="col grid_6">
    <div class="pagetip stats"><i class="icon-user"></i>
      <div class="pull-right"> Registered Users <br>
        <b class="pull-right"><?php echo countEntries(Users::uTable);?></b> <br>
      </div>
    </div>
  </div>
  <div class="col grid_6">
    <div class="pagetip stats"><i class="icon-ok-sign"></i>
      <div class="pull-right"> Active Users <br>
        <b class="pull-right"><?php echo countEntries(Users::uTable, "active", "y");?></b> <br>
      </div>
    </div>
  </div>
  <div class="col grid_6">
    <div class="pagetip stats"><i class="icon-time"></i>
      <div class="pull-right"> Pending Users <br>
        <b class="pull-right"><?php echo countEntries(Users::uTable, "active", "t");?></b> <br>
      </div>
    </div>
  </div>
  <div class="col grid_6">
    <div class="pagetip stats"><i class="icon-group"></i>
      <div class="pull-right"> Active Memberships <br>
        <b class="pull-right"><?php echo countEntries(Users::uTable, "membership_id", "<>0");?></b> <br>
      </div>
    </div>
  </div>
</div>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-bookmark"></i> Site Revenue</h1>
      <aside>
        <ul class="settingsnav">
          <li> <a href="#" data-hint="Actions" class="minilist hint--left hint--add hint--always hint--rounded"><span class="icon-reorder"></span></a>
            <div id="settingslist2">
              <ul class="sub">
                <li><i class="icon-calendar pull-left"></i> <a href="javascript:void(0);" data-type="day">Today</a></li>
                <li><i class="icon-calendar pull-left"></i> <a href="javascript:void(0);" data-type="week">This Week</a></li>
                <li><i class="icon-calendar pull-left"></i> <a href="javascript:void(0);" data-type="month">This Month</a></li>
                <li><i class="icon-calendar pull-left"></i> <a href="javascript:void(0);" data-type="year">This Year</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </header>
  <div class="content2"> 
    <!-- Start Chart -->
    <div class="box">
      <div id="chart" style="height:300px"></div>
    </div>
    <!-- End Chart /-->
    <hr />
    <?php if(!$reports):?>
    <?php echo Filter::msgInfo('<span>Info!</span>There are no project transactions for current Year...',false);?>
    <?php else:?>
    <!-- Start Revenue List-->
    
    <table class="myTable">
      <thead>
        <tr>
          <th class="header">Month / Year</th>
          <th class="header">#Transactions</th>
          <th class="header">Total Revenue</th>
        </tr>
      </thead>
      <?php foreach($reports as $report):?>
      <tr>
        <td><?php echo date("F", mktime(0, 0, 0, $report->month, 10)) . ' / '.$core->year;?></td>
        <td><?php echo $report->total;?></td>
        <td><?php echo $core->formatMoney($report->totalprice);?></td>
      </tr>
      <?php endforeach ?>
      <?php unset($report);?>
      <tr>
        <td><strong><i class="icon-calendar"></i> Total Year</strong></td>
        <td><strong><i class="icon-refresh"></i> <?php echo $row->total;?></strong></td>
        <td><strong><i class="icon-money"></i> <?php echo $core->formatMoney($row->totalprice);?></strong></td>
      </tr>
    </table>
    <!-- End Revenue List-->
    <?php endif;?>
  </div>
</section>
<script type="text/javascript">
// <![CDATA[
function getChart(range) {
    $.ajax({
        type: 'GET',
        url: 'controller.php',
		data : {
			'getSaleStats' :1,
			'timerange' : range
		},
        dataType: 'json',
        async: false,
        success: function (json) {
            var option = {
                shadowSize: 0,
                lines: {
                    show: true,
                    fill: true,
                    lineWidth: 1
                },
                grid: {
                    backgroundColor: '#FFFFFF'
                },
                xaxis: {
                    ticks: json.xaxis
                }
            }
            $.plot($('#chart'), [json.order], option);
        }
    });
}
getChart(0);
$(document).ready(function () {
    $('#settingslist2 a').on('click', function () {
        var type = $(this).attr('data-type')
		  getChart(type);
	});  
 });	  
// ]]>
</script> 