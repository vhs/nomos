<?php
  /**
   * User Register
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: register.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("init.php");
	  
  $listpackrow = $member->getMembershipListFrontEnd();
?>
<?php include("header.php");?>
<p class="bluetip"><i class="icon-lightbulb icon-3x pull-left"></i> Below are all the membership packages available. <br />
  <?php if(!$user->logged_in):?>
  Please <a href="index.php">login</a> to select desired membership.
  <?php endif;?>
</p>
<section class="widget">
  <header>
    <div class="row">
      <h1><i class="icon-reorder"></i> Membership Packages</h1>
    </div>
  </header>
  <div class="content2">
    <ul id="plans">
      <?php foreach ($listpackrow as $prow):?>
      <li class="plan">
        <h2><?php echo $prow->title;?></h2>
        <p class="price"><?php echo $core->formatMoney($prow->price);?> / <span><?php echo $prow->days . ' ' .$member->getPeriod($prow->period);?></span></p>
        <p class="recurring"><?php echo ($prow->recurring) ? 'Yes' : 'No';?></p>
        <p class="desc"><?php echo $prow->description;?></p>
      </li>
      <?php endforeach;?>
    </ul>
  </div>
</section>
<script type="text/javascript">
// <![CDATA[
$(document).ready(function () {
    $("#plans").gridalicious({
        selector: 'li',
        width: 200,
        animate: true
    });
});
// ]]>
</script>
<?php include("footer.php");?>