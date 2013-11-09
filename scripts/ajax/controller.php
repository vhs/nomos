<?php
  /**
   * Controller
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: controller.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  require_once("../init.php");

  if (!$user->logged_in)
      redirect_to("../index.php");
?>
<?php
  /* Proccess Cart */
  if (isset($_POST['addtocart']))
      : list($membership_id, $gate_id) = explode(":", $_POST['addtocart']);
  
  $row = Core::getRowById("memberships", $membership_id, false, false);
  $row2 = Core::getRowById("gateways", $gate_id, false, false);
  
  if ($row->trial && $user->trialUsed()) {
      Filter::msgInfo('<span>Info!</span>Sorry, you have already used your trial membership!');
      die();
  }  
  if ($row->price == 0.00) {
      $data = array(
			'membership_id' => $row->id, 
			'mem_expire' => $user->calculateDays($row->id), 
			'trial_used' => ($row->trial == 1) ? 1 : 0
	  );
	  
      $db->update(Users::uTable, $data, "id='" . (int)$user->uid . "'");
      ($db->affected()) ? Filter::msgOk('<span>Success!</span>You have successfully activated ' . $row->title, false) : Filter::msgError('<span>Alert!</span>Nothing to process.');
  } else {
      $form_url = BASEPATH . "gateways/" . $row2->dir . "/form.tpl.php";
      ($gate_id != "FREE" && file_exists($form_url)) ? include($form_url) : redirect_to("../account.php");
  }
  
  endif;
?>
<?php
  /* Proccess User */
  if (isset($_POST['processUser']))
      : if (intval($_POST['processUser']) == 0 || empty($_POST['processUser']))
      : redirect_to("../account.php");
  endif;
  $user->updateProfile();
  endif;
?>