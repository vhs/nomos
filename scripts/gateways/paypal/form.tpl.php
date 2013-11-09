<?php
  /**
   * Paypal Form
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: form.tpl.php, v2.00 2011-04-20 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<?php $url = ($row2->demo == '0') ? 'www.sandbox.paypal.com' : 'www.paypal.com';?>
<div class="box">
  <form action="https://<?php echo $url;?>/cgi-bin/webscr" method="post" id="pp_form" name="pp_form">
    <table class="myTable">
        <tr>
          <td colspan="2"><h2>Purchase Summary - <?php echo $row2->displayname;?></h2></td>
        </tr>
      <tr>
        <th><strong>Membership Title:</strong></th>
        <td><strong><?php echo $row->title;?></strong></td>
      </tr>
      <tr>
        <th><strong>Membership Price:</strong></th>
        <td><strong><?php echo $core->formatMoney($row->price);?></strong></td>
      </tr>
      <tr>
        <th><strong>Membership Period:</strong></th>
        <td><strong><?php echo $row->days . ' ' .$member->getPeriod($row->period);?></strong></td>
      </tr>
      <tr>
        <th><strong>Recurring Payment:</strong></th>
        <td><strong><?php echo ($row->recurring == 1) ? 'Yes' : 'No';?></strong></td>
      </tr>
      <tr>
        <th><strong>Valid Until:</strong></th>
        <td><strong><?php echo $member->calculateDays($row->period, $row->days);?></strong></td>
      </tr>
      <tr>
        <th><strong>Membership Description:</strong></th>
        <td><?php echo $row->description;?></td>
      </tr>
      <tr class="nohover">
        <td colspan="2"><input type="image" src="gateways/paypal/paypal_big.png" name="submit" style="vertical-align:middle;border:0;width:264px;margin-right:10px" title="Pay With Paypal" alt="" onclick="document.pp_form.submit();"/> </td>
      </tr>
    </table>
    <?php if($row->recurring == 1):?>
    <input type="hidden" name="cmd" value="_xclick-subscriptions" />
    <input type="hidden" name="a3" value="<?php echo $row->price;?>" />
    <input type="hidden" name="p3" value="<?php echo $row->days;?>" />
    <input type="hidden" name="t3" value="<?php echo $row->period;?>" />
    <input type="hidden" name="src" value="1" />
    <input type="hidden" name="sr1" value="1" />
    <?php else:?>
    <input type="hidden" name="cmd" value="_xclick" />
    <input type="hidden" name="amount" value="<?php echo $row->price;?>" />
    <?php endif;?>
    <input type="hidden" name="business" value="<?php echo $row2->extra;?>" />
    <input type="hidden" name="item_name" value="<?php echo $row->title;?>" />
    <input type="hidden" name="item_number" value="<?php echo $row->id . '_' . $user->uid;?>" />
    <input type="hidden" name="return" value="<?php echo SITEURL;?>/account.php" />
    <input type="hidden" name="rm" value="2" />
    <input type="hidden" name="notify_url" value="<?php echo SITEURL.'/gateways/'.$row2->dir;?>/ipn.php" />
    <input type="hidden" name="cancel_return" value="<?php echo SITEURL;?>/account.php" />
    <input type="hidden" name="no_note" value="1" />
    <input type="hidden" name="currency_code" value="<?php echo ($row2->extra2) ? $row2->extra2 : $core->currency;?>" />
  </form>
</div>