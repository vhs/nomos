<?php
  /**
   * Maintenance
   *
   * @package Advanced Login System
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: maintenance.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');
?>
<p class="greentip"><i class="icon-lightbulb icon-3x pull-left"></i> Here you can perform site maintenance, such as deleting inctive and banned users<br>
  Be careful what you doing, these actions can not be undone..</p>
<form class="xform" id="admin_form" method="post">
  <header>Maintenance Manager<span>System Maintenance </span></header>
  <div class="row">
    <section class="col col-6">
      <label class="input"> Delete Inactive Users </label>
      <div class="note">This will delete all users (not administrators), who have not logged in to the site within a certain time period. It will not delete users pending verification proccess. You specify the days spent inactive</div>
    </section>
    <section class="col col-3">
      <select name="days">
        <option value="3">3</option>
        <option value="7">7</option>
        <option value="14">14</option>
        <option value="30">30</option>
        <option value="60">60</option>
        <option value="100">100</option>
        <option value="180">180</option>
        <option value="365">365</option>
      </select>
      <div class="note">Inactive Days</div>
    </section>
    <section class="col col-3">
      <button class="button button-red inline" name="inactive" type="submit">Delete Inactive<span><i class="icon-ok"></i></span></button>
    </section>
  </div>
  <hr />
  <div class="row">
    <section class="col col-9">
      <label class="input"> Delete Banned Users </label>
      <div class="note">This will delete all <span class="label2 label-important"><?php echo countEntries("users","active","b");?></span> banned user(s).</div>
    </section>
    <section class="col col-3">
      <button class="button button-orange inline" name="banned" type="submit">Delete Banned<span><i class="icon-ok"></i></span></button>
    </section>
  </div>
</form>
<?php echo Core::doForm("processMaintenance");?> 