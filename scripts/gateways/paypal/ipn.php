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
  ini_set('error_log', '/tmp/ipn_errors.log');


$error_date = date('Y-m-d H:i:s');

error_log("$error_date: *************************");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": starting");

if (isset($_POST))
error_log('post: '.serialize($_POST));

  if (isset($_POST) && isset($_POST['payment_status'])) {
      require_once ("../../init.php");
      require_once ("../../lib/class_pp.php");


      $demo = getValue("demo", "gateways", "name = 'paypal'");

error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": demo = '$demo'");

      $listener = new IpnListener();
      $listener->use_live = $demo;
      $listener->use_ssl = true;
      $listener->use_curl = false;

      try {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": trying...");
          $listener->requirePostMethod();
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": trying...");
          $ppver = $listener->processIpn();
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": ppver = '$ppver'");
      }
      catch (exception $e) {
          error_log($e->getMessage());
          exit(0);
      }

      if ($ppver) {
          $payment_status = $_POST['payment_status'];
          $receiver_email = $_POST['receiver_email'];
          
          if (isset($_POST['item_number']) && preg_match('/^\d+_\d+$/', $_POST['item_number']))
          {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": normal code branch");
            list($membership_id, $user_id) = explode("_", $_POST['item_number']);
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": mid $membership_id, uid $user_id");
          } else {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": new code branch");

// 2013-11-10 Bruce
// This block looks up user/membership-type information based on payer_id or payer_email
// fields in the PayPal IPN record.  If there is no match, it will try to create a user
// record and pick either the membership type named "Member" or the first membership type
// the database will cough up.

            $payer_id = preg_replace('/[^[:alnum:]]/', '', $_POST['payer_id']);
            $payer_email = $_POST['payer_email'];

            $user_id = getValue('id', Users::uTable, "paypal_id = '$payer_id'");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": user_id '$user_id'");

            if ($user_id < 1) {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": user_id '$user_id'");
              $user_id = getValue('id', Users::uTable, "email='".sanitize($payer_email)."' AND paypal_id=''");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": user_id '$user_id'");

              if ($user_id > 0) {
                $db->update(Users::uTable, array('paypal_id' => $payer_id), "id=$user_id");
              }
            }

            if ($user_id > 0) {
              $db->update(Users::uTable, array('payment_email' => sanitize($payer_email)), "id=$user_id");
            }
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": user_id '$user_id'");

            if ($user_id < 1) {
              $fname = (isset($_POST['first_name']) ? sanitize($_POST['first_name']) : 'unknown');
              $lname = (isset($_POST['last_name']) ? sanitize($_POST['last_name']) : 'user');
              $username = trim(substr("$fname.$lname", 0, 45), '.');
              if ($username == '')
                $username = 'unknown';
              for ($i=0; ; ++$i) {
                $name = ($i==0 ? $username : "$username$i");
                $id = getValue('id', Users::uTable, "username='".sanitize($name)."'");
                if ($id < 1) {
                  $username = $name;
                  break;
                }
                if ($i > 99) {
                  throw new Exception("More than 100 identical user names? ($username)");
                }
              }

              $data = array(
                'username' => sanitize($username),
                'password' => '',
                'email' => sanitize($payer_email),
                'fname' => isset($_POST['first_name']) ? sanitize($_POST['first_name']) : 'unknown',
                'lname' => isset($_POST['last_name']) ? sanitize($_POST['last_name']) : 'user',
                'token' => 0,
                'active' => 'y',
                'paypal_id' => sanitize($payer_id),
                'payment_email' => sanitize($payer_email),
                'created' => "NOW()",
              );

              $db->insert(Users::uTable, $data);

              $user_id = getValue('id', Users::uTable, "paypal_id = '$payer_id'");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": user_id '$user_id'");

              if ($user_id < 1)
                throw new Exception("Could not create new user record for '$payer_email'");
            }

            $membership_id = getValue('membership_id', Users::uTable, "id=$user_id");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": membership_id '$membership_id'");

            if ($membership_id < 1)
            {
              $membership_id = getValue('id', Membership::mTable, "title='Member'");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": membership_id '$membership_id'");
              if ($membership_id > 0)
              {
                $mc_gross = (float)$_POST['mc_gross'];
                $price = (float)getValue('price', Membership::mTable, "id=$membership_id");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": mc_gross $mc_gross price $price");

                if ($mc_gross < $price)
                {
                  $new_id = getValue('id', Membership::mTable, "price<='$mc_gross'");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": new_id $new_id");

                  if ($new_id < 1)
{
                    $new_id = getValue('id', Membership::mTable, "price<=$price'");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": new_id $new_id");
}

                  if ($new_id > 0)
{
                    $membership_id = $new_id;
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": membership_id changed to $membership_id");
}
                }
              }
            }
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": membership_id '$membership_id'");

            if ($membership_id < 1)
              $membership_id = getValue('id', Membership::mTable, "id>0");
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": membership_id '$membership_id'");

            if ($membership_id < 1)
              throw new Exception("Could not identify a membership type for user $user_id, '$payer_email'");
          }

          $mc_gross = $_POST['mc_gross'];
          $txn_id = $_POST['txn_id'];
    
          $getxn_id = $member->verifyTxnId($txn_id);  // returns true iff we haven't recorded this payment transaction ID already
          $price = getValueById("price", Membership::mTable, intval($membership_id));
          $pp_email = getValue("extra", Membership::gTable, "name = 'paypal'");
    
          $v1 = number_format($mc_gross, 2, '.', '');
          $v2 = number_format($price, 2, '.', '');

          if ($_POST['payment_status'] == 'Completed') {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": processing completed paypal transaction");

// 2013-11-10 Bruce
// ****** WARNING ******
// Note that this reduced if () condition renders payment insecure; we log almost anything as 'success'
// so long as a payment was received.  Should be good enough for membership dues, but don't ship goods
// to unknown end users with this code.
//              if ($receiver_email == $pp_email && $v1 == $v2 && $getxn_id == true) {
              if ($receiver_email == $pp_email && $getxn_id == true) {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": inside the payment record creation branch");

                  $sql = "SELECT * FROM " . Membership::mTable . " WHERE id='" . (int)$membership_id . "'";
                  $row = $db->first($sql);

                  $username = getValueById("username", Users::uTable, intval($user_id));

                  $payment_date = date('Y-m-d H:i:s', strtotime($_POST['payment_date']));

                  $data = array(
                      'txn_id' => $txn_id,
                      'membership_id' => $row->id,
                      'user_id' => (int)$user_id,
                      'rate_amount' => (float)$mc_gross,
                      'ip' => $_SERVER['REMOTE_ADDR'],
                      'date' => $payment_date,
                      'pp' => "PayPal",
                      'currency' => $_POST['mc_currency'],
                      'status' => 1);

                  $db->insert(Membership::pTable, $data);

                  $udata = array(
                      'membership_id' => $row->id,
                      'mem_expire' => $user->calculateDays($row->id, $payment_date),
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

if (0) {
// Don't start notifying members just yet...
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
              }

          } else {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": processing failed paypal transaction");
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
  } else {
error_log("$error_date: ".basename(__FILE__)."@".__LINE__.": not a POST or wrong type, ignoring");
  }
?>
