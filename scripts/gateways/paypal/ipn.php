<?php
  /**
   * PayPal IPN
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: ipn.php,<?php echo  2010-08-10 21:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  define("_PIPN", true);


  ini_set('log_errors', true);
  ini_set('error_log', dirname(__file__) . '/ipn_errors.log');

  if (isset($_POST['payment_status'])) {
      require_once ("../../init.php");
      require_once ("../../lib/class_pp.php");


      $demo = getValue("demo", "gateways", "name = 'paypal'");

      $listener = new IpnListener();
      $listener->use_live = $demo;
      $listener->use_ssl = true;
      $listener->use_curl = false;

      try {
          $listener->requirePostMethod();
          $ppver = $listener->processIpn();
      }
      catch (exception $e) {
          error_log($e->getMessage());
          exit(0);
      }

      $payment_status = $_POST['payment_status'];
      $receiver_email = $_POST['receiver_email'];
      list($membership_id, $user_id) = explode("_", $_POST['item_number']);
      $mc_gross = $_POST['mc_gross'];
      $txn_id = $_POST['txn_id'];

      $getxn_id = $member->verifyTxnId($txn_id);
      $price = getValueById("price", Membership::mTable, intval($membership_id));
      $pp_email = getValue("extra", Membership::gTable, "name = 'paypal'");

      $v1 = number_format($mc_gross, 2, '.', '');
      $v2 = number_format($price, 2, '.', '');

      if ($ppver) {
          if ($_POST['payment_status'] == 'Completed') {
              if ($receiver_email == $pp_email && $v1 == $v2 && $getxn_id == true) {
                  $sql = "SELECT * FROM " . Membership::mTable . " WHERE id='" . (int)$membership_id . "'";
                  $row = $db->first($sql);

                  $username = getValueById("username", Users::uTable, intval($user_id));

                  $data = array(
                      'txn_id' => $txn_id,
                      'membership_id' => $row->id,
                      'user_id' => (int)$user_id,
                      'rate_amount' => (float)$mc_gross,
                      'ip' => $_SERVER['REMOTE_ADDR'],
                      'date' => "NOW()",
                      'pp' => "PayPal",
                      'currency' => $_POST['mc_currency'],
                      'status' => 1);

                  $db->insert(Membership::pTable, $data);

                  $udata = array(
                      'membership_id' => $row->id,
                      'mem_expire' => $user->calculateDays($row->id),
                      'trial_used' => ($row->trial == 1) ? 1 : 0);

                  $db->update(Users::uTable, $udata, "id='" . (int)$user_id . "'");

                  /* == Notify Administrator == */
                  require_once (BASEPATH . "lib/class_mailer.php");
                  $row2 = Core::getRowById(Core::eTable, 5);

                  $body = str_replace(array(
                      '[USERNAME]',
                      '[ITEMNAME]',
                      '[PRICE]',
                      '[STATUS]',
                      '[PP]',
                      '[IP]'), array(
                      $username,
                      $row->title,
                      $core->formatMoney($mc_gross),
                      "Completed",
                      "PayPal",
                      $_SERVER['REMOTE_ADDR']), $row2->body);

                  $newbody = cleanOut($body);

                  $mailer = $mail->sendMail();
                  $message = Swift_Message::newInstance()
							->setSubject($row2->subject)
							->setTo(array($core->site_email => $core->site_name))
							->setFrom(array($core->site_email => $core->site_name))
							->setBody($newbody, 'text/html');

                  $mailer->send($message);


                  /* == Notify User == */
                  $row3 = Core::getRowById(Core::eTable, 15);
                  $uemail = getValueById("email", Users::uTable, "id = " . intval($user_id));

                  $body2 = str_replace(array(
                      '[USERNAME]',
                      '[MNAME]',
                      '[VALID]'), array(
                      $username,
                      $row->title,
                      $udata['mem_expire']), $row3->body);

                  $newbody2 = cleanOut($body2);

                  $mailer2 = $mail->sendMail();
                  $message2 = Swift_Message::newInstance()
							->setSubject($row3->subject)
							->setTo(array($uemail => $username))
							->setFrom(array($core->site_email => $core->site_name))
							->setBody($newbody2, 'text/html');

                  $mailer2->send($message2);
              }

          } else {
              /* == Failed Transaction= = */
              require_once (BASEPATH . "lib/class_mailer.php");
              $row2 = Core::getRowById(Core::eTable, 6);
              $itemname = getValueById("title", Membership::mTable, intval($membership_id));

              $body = str_replace(array(
                  '[USERNAME]',
                  '[ITEMNAME]',
                  '[PRICE]',
                  '[STATUS]',
                  '[PP]',
                  '[IP]'), array(
                  $username,
                  $itemname,
                  $core->formatMoney($mc_gross),
                  "Failed",
                  "PayPal",
                  $_SERVER['REMOTE_ADDR']), $row2->body);

              $newbody = cleanOut($body);

              $mailer = $mail->sendMail();
              $message = Swift_Message::newInstance()
						->setSubject($row2->subject)
						->setTo(array($core->site_email => $core->site_name))
						->setFrom(array($core->site_email => $core->site_name))
						->setBody($newbody, 'text/html');

              $mailer->send($message);

          }
      }
  }
?>