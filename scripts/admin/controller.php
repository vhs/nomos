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

  require_once ("../init.php");
  if (!$user->is_Admin())
      redirect_to("../login.php");
?>
<?php
  /* == Proccess Configuration == */
  if (isset($_POST['processConfig'])):
      $core->processConfig();
  endif;

  /* == Proccess Newsletter == */
  if (isset($_POST['processNewsletter'])):
      $core->processNewsletter();
  endif;

  /* == Proccess Email Template == */
  if (isset($_POST['processEmailTemplate'])):
      Filter::$id = (isset($_POST['id'])) ? $_POST['id'] : 0;
      $core->processEmailTemplate();
  endif;

  /* == Proccess News == */
  if (isset($_POST['processNews'])):
      Filter::$id = (isset($_POST['id'])) ? $_POST['id'] : 0;
      $core->processNews();
  endif;

  /* == Delete News == */
  if (isset($_POST['deleteNews'])):
      $id = intval($_POST['deleteNews']);
      $db->delete("news", "id='" . $id . "'");
      $title = sanitize($_POST['newstitle']);

      print ($db->affected()) ? Filter::msgOk('News <strong>' . $title . '</strong> deleted successfully!') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
  endif;

  /* == Proccess User == */
  if (isset($_POST['processUser'])):
      Filter::$id = (isset($_POST['id'])) ? $_POST['id'] : 0;
      $user->processUser();
  endif;

  /* == Acctivate User == */
  if (isset($_POST['activateAccount'])):
      $user->activateAccount();
  endif;
  
  /* == Delete User == */
  if (isset($_POST['deleteUser'])):
      $id = intval($_POST['deleteUser']);
      if ($id == 1):
          Filter::msgError("<span>Error!</span>You cannot delete main Super Admin account!");
      else:
          $db->delete("users", "id='" . $id . "'");
          //Jarrett  9/17/2014 THIS IS A BUG AND PRODUCES AN ERROR OKAY
          //$username = sanitize($_POST['username']);
          print ($db->affected()) ? Filter::msgOk('User deleted successfully!') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
      endif;
  endif;
  
  /* == User Search == */
  if (isset($_POST['userSearch'])):
      $string = sanitize($_POST['userSearch'], 15);

      if (strlen($string) > 3):
          $sql = "SELECT id, username, email, CONCAT(fname,' ',lname) as name" 
		  . "\n FROM users" 
		  . "\n WHERE MATCH (username) AGAINST ('" . $db->escape($string) . "*' IN BOOLEAN MODE)" 
		  . "\n ORDER BY username LIMIT 10";
          $display = '';
          if ($result = $db->fetch_all($sql)):
              $display .= '<ul id="searchresults">';
              foreach ($result as $row):
                  $link = 'index.php?do=users&amp;action=edit&amp;id=' . (int)$row->id;
                  $display .= '<li> <a href="' . $link . '"><p><i class="icon-chevron-sign-right"></i> ' . $row->username . ' - ' . $row->name . '</p>' . $row->email . '</a></li>';
              endforeach;
              $display .= '</ul>';
              print $display;
          endif;
      endif;
  endif;

  /* == Site Maintenance == */
  if (isset($_POST['processMaintenance'])):
      if (isset($_POST['inactive'])):
          $now = date('Y-m-d H:i:s');
          $diff = intval($_POST['days']);
          $expire = date("Y-m-d H:i:s", strtotime($now . -$diff . " days"));
          $db->delete("users", "lastlogin < '" . $expire . "' AND active = 'y' AND userlevel !=9");

          print ($db->affected()) ? Filter::msgOk('All (' . $db->affected() . ') inactive user(s) deleted successfully!') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');

      elseif (isset($_POST['banned'])):
          $db->delete("users", "active = 'b'");
          print ($db->affected()) ? Filter::msgOk('All banned users deleted successfully!') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
      endif;
  endif;
  
  /* == Proccess Membership == */
  if (isset($_POST['processMembership'])):
      Filter::$id = (isset($_POST['id'])) ? $_POST['id'] : 0;
      $member->processMembership();
  endif;

  /* == Delete Membership == */
  if (isset($_POST['deleteMembership'])):
      $id = intval($_POST['deleteMembership']);
      $db->delete("memberships", "id='" . $id . "'");
      $title = sanitize($_POST['posttitle']);
	  
      print ($db->affected()) ? Filter::msgOk('Membership <strong>' . $title . '</strong> deleted successfully!') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
  endif;

  /* == Proccess Gateway == */
  if (isset($_POST['processGateway'])):
      Filter::$id = (isset($_POST['id'])) ? $_POST['id'] : 0;
      $member->processGateway();
  endif;

  /* == Delete Transaction == */
  if (isset($_POST['deleteTransaction'])):
      $id = intval($_POST['deleteTransaction']);
      $db->delete("payments", "id='" . $id . "'");
      $title = sanitize($_POST['posttitle']);
	  
      print ($db->affected()) ? Filter::msgOk('Transaction <strong>' . $title . '</strong> deleted successfully!') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
  endif;
  
  /* == Transaction Search == */
  if (isset($_POST['transSearch'])):
      $string = sanitize($_POST['transSearch'], 25);

      if (strlen($string) > 5):

          $sql = "SELECT p.*, p.id as id, u.username, m.title," 
		  . "\n DATE_FORMAT(p.date, '%d. %b. %Y.') as created" 
		  . "\n FROM " . Membership::pTable . " as p" 
		  . "\n LEFT JOIN users as u ON u.id = p.user_id" 
		  . "\n LEFT JOIN " . Membership::mTable . " as m ON m.id = p.membership_id" 
		  . "\n WHERE MATCH (txn_id) AGAINST ('" . $db->escape($string) . "*' IN BOOLEAN MODE)" 
		  . "\n ORDER BY username LIMIT 10";
          $d = $db->fetch_all($sql);

          $display = '';
          if ($result = $db->fetch_all($sql)):
              $display .= '<ul id="searchresults">';
              foreach ($result as $row):
                  $link = 'index.php?do=users&amp;action=edit&amp;id=' . (int)$row->id;
                  $display .= '<li> <a href="' . $link . '"><p><i class="icon-chevron-sign-right"></i> ' . $row->username . ' - (' . $row->title . ')</p>' . $row->created . '</a></li>';
              endforeach;
              $display .= '</ul>';
              print $display;
          endif;
      endif;
  endif;
  
  /* == Export Transactions == */
  if (isset($_GET['exportTransactions'])) :
      $result = $member->getPayments(false, false, false);

      $type = "vnd.ms-excel";
      $date = date('m-d-Y H:i');
      $title = "Exported from the " . $core->site_name . " on $date";

      header("Pragma: public");
      header("Expires: 0");
      header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
      header("Content-Type: application/force-download");
      header("Content-Type: application/octet-stream");
      header("Content-Type: application/download");
      header("Content-Type: application/$type");
      header("Content-Disposition: attachment;filename=temp_" . time() . ".xls");
      header("Content-Transfer-Encoding: binary ");

      echo ("$title\n");
      $sep = "\t";

      print '
	  <table width="100%" cellpadding="1" cellspacing="2" border="1">
	  <caption>' . $title . '</caption>
		<tr>
		  <td>TXN_ID</td>
		  <td>Membership Title</td>
		  <td>Username</td>
		  <td>Amount</td>
		  <td>Payment Date</td>
		  <td>Processor</td>
		  <td>Payment email</td>
		</tr>';
      foreach ($result as $v):
          print '<tr>
			  <td>' . $v->txn_id . '</td>
			  <td>' . $v->title . '</td>
			  <td>' . $v->username . '</td>
			  <td>' . $v->rate_amount . '</td>
			  <td>' . $v->date . '</td>
			  <td>' . $v->pp . '</td>
			  <td>' . $v->payment_email . '</td>
			</tr>';
      endforeach;

      print '</table>';
      exit();
  endif;
  
  
  /* == Page Builder == */
  if (isset($_POST['processBuilder'])):
      Membership::processBuilder();
  endif;

  /* == Delete SQL Backup == */
  if (isset($_POST['deleteBackup'])):
      $action = @unlink(BASEPATH . 'admin/backups/' . sanitize($_POST['deleteBackup']));

      print ($action) ? Filter::msgOk('<span>Success!</span>Backup deleted successfully!') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
  endif;

  /* == Latest Sales Stats == */
  if (isset($_GET['getSaleStats'])):
      if (intval($_GET['getSaleStats']) == 0 || empty($_GET['getSaleStats'])):
          die();
      endif;

      $range = (isset($_GET['timerange'])) ? sanitize($_GET['timerange']) : 'month';
      $data = array();
      $data['order'] = array();
      $data['xaxis'] = array();
      $data['order']['label'] = '&nbsp;&nbsp;Site Revenue';

      switch ($range) {
          case 'day':
              $date = date('Y-m-d');
              for ($i = 0; $i < 24; $i++) {
                  $query = $db->first("SELECT COUNT(*) AS total FROM payments" 
				  . "\n WHERE DATE(date) = '" . $db->escape($date) . "'" 
				  . "\n AND HOUR(date) = '" . (int)$i . "'" 
				  . "\n GROUP BY HOUR(date) ORDER BY date ASC");

                  ($query) ? $data['order']['data'][] = array($i, (int)$query->total) : $data['order']['data'][] = array($i, 0);
                  $data['xaxis'][] = array($i, date('H', mktime($i, 0, 0, date('n'), date('j'), date('Y'))));
              }
              break;
          case 'week':
              $date_start = strtotime('-' . date('w') . ' days');

              for ($i = 0; $i < 7; $i++) {
                  $date = date('Y-m-d', $date_start + ($i * 86400));
                  $query = $db->first("SELECT COUNT(*) AS total FROM payments" 
				  . "\n WHERE DATE(date) = '" . $db->escape($date) . "'" 
				  . "\n GROUP BY DATE(date)");

                  ($query) ? $data['order']['data'][] = array($i, (int)$query->total) : $data['order']['data'][] = array($i, 0);
                  $data['xaxis'][] = array($i, date('D', strtotime($date)));
              }

              break;
          default:
          case 'month':
              for ($i = 1; $i <= date('t'); $i++) {
                  $date = date('Y') . '-' . date('m') . '-' . $i;
                  $query = $db->first("SELECT COUNT(*) AS total FROM payments" 
				  . "\n WHERE (DATE(date) = '" . $db->escape($date) . "')" 
				  . "\n GROUP BY DAY(date)");

                  ($query) ? $data['order']['data'][] = array($i, (int)$query->total) : $data['order']['data'][] = array($i, 0);
                  $data['xaxis'][] = array($i, date('j', strtotime($date)));
              }
              break;
          case 'year':
              for ($i = 1; $i <= 12; $i++) {
                  $query = $db->first("SELECT COUNT(*) AS total FROM payments" 
				  . "\n WHERE YEAR(date) = '" . date('Y') . "'" 
				  . "\n AND MONTH(date) = '" . $i . "'" 
				  . "\n GROUP BY MONTH(date)");

                  ($query) ? $data['order']['data'][] = array($i, (int)$query->total) : $data['order']['data'][] = array($i, 0);
                  $data['xaxis'][] = array($i, date('M', mktime(0, 0, 0, $i, 1, date('Y'))));
              }
              break;
      }

      print json_encode($data);
  endif;
?>
