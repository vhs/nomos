<?php
  /**
   * Membership Class
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: class_membership.php, v2.00 2011-07-10 10:12:05 gewa Exp $
   */

  if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');

  class Membership
  {
      const mTable = "memberships";
      const pTable = "payments";
      const gTable = "gateways";
      private static $db;


      /**
       * Membership::__construct()
       * 
       * @return
       */
      public function __construct()
      {
          self::$db = Registry::get("Database");

      }

      /**
       * Membership::getMemberships()
       * 
       * @return
       */
      public function getMemberships()
      {
          $sql = "SELECT * FROM " . self::mTable . " ORDER BY price";
          $row = self::$db->fetch_all($sql);

          return ($row) ? $row : 0;
      }

      /**
       * Membership::getMembershipListFrontEnd()
       * 
       * @return
       */
      public function getMembershipListFrontEnd()
      {
          $sql = "SELECT * FROM " . self::mTable . " WHERE private = 0 AND active = 1 ORDER BY price";
          $row = self::$db->fetch_all($sql);

          return ($row) ? $row : 0;
      }

      /**
       * Membership::processMembership()
       * 
       * @return
       */
      public function processMembership()
      {
          Filter::checkPost('title', "Please enter Membership Title!");
          Filter::checkPost('price', "Please enter valid Price!");
          Filter::checkPost('days', "Please enter membership period!");
          if (!is_numeric($_POST['days']))
              $core->msgs['days'] = 'Membership period must be numeric value!';

          if (empty(Filter::$msgs)) {
              $data = array(
                  'title' => sanitize($_POST['title']),
                  'price' => floatval($_POST['price']),
                  'days' => intval($_POST['days']),
                  'period' => sanitize($_POST['period']),
                  'trial' => intval($_POST['trial']),
                  'recurring' => intval($_POST['recurring']),
                  'private' => intval($_POST['private']),
                  'description' => sanitize($_POST['description']),
                  'active' => intval($_POST['active']));

              if ($data['trial'] == 1) {
                  $trial['trial'] = "DEFAULT(trial)";
                  self::$db->update(self::mTable, $trial);
              }

              (Filter::$id) ? self::$db->update(self::mTable, $data, "id='" . Filter::$id . "'") : self::$db->insert(self::mTable, $data);
              $message = (Filter::$id) ? '<span>Success!</span>Membership updated successfully!' : '<span>Success!</span>Membership added successfully!';

              (self::$db->affected()) ? Filter::msgOk($message) : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
          } else
              print Filter::msgStatus();
      }

      /**
       * Membership::getMembershipPeriod()
       * 
       * @param bool $sel
       * @return
       */
      public function getMembershipPeriod($sel = false)
      {
          $arr = array(
              'D' => "Days",
              'W' => "Weeks",
              'M' => "Months",
              'Y' => "Years");

          $data = '';
          $data .= '<select name="period" style="width:100px" class="select">';
          foreach ($arr as $key => $val) {
              if ($key == $sel) {
                  $data .= "<option selected=\"selected\" value=\"" . $key . "\">" . $val . "</option>\n";
              } else
                  $data .= "<option value=\"" . $key . "\">" . $val . "</option>\n";
          }
          unset($val);
          $data .= "</select>";
          return $data;
      }

      /**
       * Membership::getPeriod()
       * 
       * @param bool $value
       * @return
       */
      public function getPeriod($value)
      {
          switch ($value) {
              case "D":
                  return "Days";
                  break;
              case "W":
                  return "Weeks";
                  break;
              case "M":
                  return "Months";
                  break;
              case "Y":
                  return "Years";
                  break;
          }

      }

      /**
       * Membership::calculateDays()
       * 
       * @return
       */
      public function calculateDays($period, $days)
      {
          global $db;

          $now = date('Y-m-d H:i:s');
          switch ($period) {
              case "D":
                  $diff = $days;
                  break;
              case "W":
                  $diff = $days * 7;
                  break;
              case "M":
                  $diff = $days * 30;
                  break;
              case "Y":
                  $diff = $days * 365;
                  break;
          }
          return date("d M Y", strtotime($now . + $diff . " days"));
      }

      /**
       * Membership::getTotalDays()
       * Used for MoneyBookers
       * @return
       */
      public function getTotalDays($period, $days)
      {
          switch ($period) {
              case "D":
                  $diff = $days;
                  break;
              case "W":
                  $diff = $days * 7;
                  break;
              case "M":
                  $diff = $days * 30;
                  break;
              case "Y":
                  $diff = $days * 365;
                  break;
          }
          return $diff;
      }
	  
      /**
       * Membership::getPayments()
       * 
       * @param bool $where
       * @param bool $from
	   * @param bool $limit
       * @return
       */
      public function getPayments($where = false, $from = false, $limit = true)
      {

          $pager = Paginator::instance();
          $pager->items_total = countEntries(self::pTable);
          $pager->default_ipp = Registry::get("Core")->perpage;
          $pager->paginate();


          $clause = ($where) ? " WHERE p.rate_amount LIKE '%" . intval($where) . "%'" : "";

          if (isset($_GET['sort'])) {
              list($sort, $order) = explode("-", $_GET['sort']);
              $sort = sanitize($sort);
              $order = sanitize($order);
              if (in_array($sort, array(
                  "user_id",
                  "rate_amount",
                  "pp",
                  "date"))) {
                  $ord = ($order == 'DESC') ? " DESC" : " ASC";
                  $sorting = " p." . $sort . $ord;
              } else {
                  $sorting = " p.date DESC";
              }
          } else {
              $sorting = " p.date DESC";
          }

          if (isset($_POST['fromdate']) && $_POST['fromdate'] <> "" || isset($from) && $from != '') {
              $enddate = date("Y-m-d");
              $fromdate = (empty($from)) ? $_POST['fromdate'] : $from;
              if (isset($_POST['enddate']) && $_POST['enddate'] <> "") {
                  $enddate = $_POST['enddate'];
              }
              $clause .= " WHERE p.date BETWEEN '" . trim($fromdate) . "' AND '" . trim($enddate) . " 23:59:59'";
          }
          
		  $limiter = ($limit) ? $pager->limit : null;
		  
          $sql = "SELECT p.*, p.id as id, u.username, m.title," 
		  . "\n DATE_FORMAT(p.date, '%d. %b. %Y.') as created" 
		  . "\n FROM " . self::pTable . " as p" 
		  . "\n LEFT JOIN users as u ON u.id = p.user_id" 
		  . "\n LEFT JOIN " . self::mTable . " as m ON m.id = p.membership_id" 
		  . "\n " . $clause . " ORDER BY " . $sorting . $limiter;

          $row = self::$db->fetch_all($sql);

          return ($row) ? $row : 0;
      }

      /**
       * Membership::getPaymentFilter()
       * 
       * @return
       */
      public static function getPaymentFilter()
      {
          $arr = array(
              'user_id-ASC' => 'Username &uarr;',
              'user_id-DESC' => 'Username &darr;',
              'rate_amount-ASC' => 'Amount &uarr;',
              'rate_amount-DESC' => 'Amount &darr;',
              'pp-ASC' => 'Processor &uarr;',
              'pp-DESC' => 'Processor &darr;',
              'date-ASC' => 'Payment Date &uarr;',
              'date-DESC' => 'Payment Date &darr;',
              );

          $filter = '';
          foreach ($arr as $key => $val) {
              if ($key == get('sort')) {
                  $filter .= "<option selected=\"selected\" value=\"$key\">$val</option>\n";
              } else
                  $filter .= "<option value=\"$key\">$val</option>\n";
          }
          unset($val);
          return $filter;
      }

      /**
       * Membership::monthlyStats()
       * 
       * @return
       */
      public function monthlyStats()
      {
          global $db, $core;

          $sql = "SELECT id, COUNT(id) as total, SUM(rate_amount) as totalprice" 
		  . "\n FROM " . self::pTable . "\n WHERE status = '1'" 
		  . "\n AND date > '" . $core->year . "-" . $core->month . "-01'" 
		  . "\n AND date < '" . $core->year . "-" . $core->month . "-31 23:59:59'";

          $row = self::$db->first($sql);

          return ($row->total > 0) ? $row : false;
      }

      /**
       * Membership::yearlyStats()
       * 
       * @return
       */
      public function yearlyStats()
      {
          global $db, $core;

          $sql = "SELECT *, YEAR(date) as year, MONTH(date) as month," 
		  . "\n COUNT(id) as total, SUM(rate_amount) as totalprice" 
		  . "\n FROM " . self::pTable 
		  . "\n WHERE status = 1" 
		  . "\n AND YEAR(date) = " . $core->year
		  . "\n GROUP BY year DESC ,month DESC ORDER by date";

          $row = self::$db->fetch_all($sql);

          return ($row) ? $row : 0;
      }

      /**
       * Membership::getYearlySummary()
       * 
       * @return
       */
      public function getYearlySummary()
      {
          global $db, $core;

          $sql = "SELECT YEAR(date) as year, MONTH(date) as month," 
		  . "\n COUNT(id) as total, SUM(rate_amount) as totalprice" 
		  . "\n FROM " . self::pTable 
		  . "\n WHERE status = 1" 
		  . "\n AND YEAR(date) = " . $core->year;

          $row = self::$db->first($sql);

          return ($row) ? $row : 0;
      }

      /**
       * Membership::totalIncome()
       * 
       * @return
       */
      public function totalIncome()
      {
          global $db, $core;
          $sql = "SELECT SUM(rate_amount) as totalsale" 
		  . "\n FROM " . self::pTable 
		  . "\n WHERE status = 1";
          $row = self::$db->first($sql);

          $total_income = $core->formatMoney($row->totalsale);

          return $total_income;
      }

      /**
       * Membership::membershipCron()
       * 
       * @param mixed $days
       * @return
       */
      function membershipCron($days)
      {
          global $db, $core;

          $sql = "SELECT u.id, CONCAT(u.fname,' ',u.lname) as name, u.email, u.membership_id, u.trial_used, m.title, m.days," 
		  . "\n DATE_FORMAT(u.mem_expire, '%d %b %Y') as edate" 
		  . "\n FROM " . Users::uTable . " as u" 
		  . "\n LEFT JOIN " . self::mTable . " AS m ON m.id = u.membership_id" 
		  . "\n WHERE u.active = 'y' AND u.membership_id !=0" 
		  . "\n AND TO_DAYS(u.mem_expire) - TO_DAYS(NOW()) = '" . (int)$days . "'";

          $listrow = $db->fetch_all($sql);
          require_once (BASEPATH . "lib/class_mailer.php");

          if ($listrow) {
              switch ($days) {
                  case 7:
                      $mailer = $mail->sendMail();
                      $mailer->registerPlugin(new Swift_Plugins_AntiFloodPlugin(100, 30));

                      $trow = $core->getRowById("email_templates", 8);
                      $body = cleanOut($trow->body);

                      $replacements = array();
                      foreach ($listrow as $cols) {
                          $replacements[$cols->mail] = array(
                              '[NAME]' => $cols->name,
                              '[SITE_NAME]' => Registry::get("Core")->site_name,
                              '[URL]' => Registry::get("Core")->site_url);
                      }

                      $decorator = new Swift_Plugins_DecoratorPlugin($replacements);
                      $mailer->registerPlugin($decorator);

                      $message = Swift_Message::newInstance()
								->setSubject($trow->subject)
								->setFrom(array(Registry::get("Core")->site_email => Registry::get("Core")->site_name))
								->setBody($body, 'text/html');

                      foreach ($listrow as $row)
                          $message->addTo($row->email, $row->name);
                      unset($row);

                      $numSent = $mailer->batchSend($message);
                      break;

                  case 0:
                      $mailer = $mail->sendMail();
                      $mailer->registerPlugin(new Swift_Plugins_AntiFloodPlugin(100, 30));

                      $trow = Core::getRowById("email_templates", 9);
                      $body = cleanOut($trow->body);

                      $replacements = array();
                      foreach ($listrow as $cols) {
                          $replacements[$cols->mail] = array(
                              '[NAME]' => $cols->name,
                              '[SITE_NAME]' => Registry::get("Core")->site_name,
                              '[URL]' => Registry::get("Core")->site_url);
                      }

                      $decorator = new Swift_Plugins_DecoratorPlugin($replacements);
                      $mailer->registerPlugin($decorator);

                      $message = Swift_Message::newInstance()
								->setSubject($trow->subject)
								->setFrom(array($core->site_email => $core->site_name))
								->setBody($body, 'text/html');

                      foreach ($listrow as $row) {
                          $message->addTo($row->email, $row->name);
                          $data = array('membership_id' => 0, 'mem_expire' => "0000-00-00 00:00:00");
                          self::$db->update(Users::uTable, $data, "id = '" . (int)$row->id . "'");
                      }
                      unset($row);
                      $numSent = $mailer->batchSend($message);

                      break;
              }
          }
      }

      /**
       * Membership::getGateways()
       * 
       * @return
       */
      public function getGateways($active = false)
      {

          $where = ($active) ? "WHERE active = '1'" : null;
          $sql = "SELECT * FROM " . self::gTable 
		  . "\n " . $where . "\n ORDER BY name";
          $row = self::$db->fetch_all($sql);

          return ($row) ? $row : 0;
      }


      /**
       * Membership::processGateway()
       * 
       * @return
       */
      public function processGateway()
      {

          Filter::checkPost('displayname', "Please enter Display Gateway Name!");
          Filter::checkPost('extra', "Please enter Valid Email Address!");

          if (empty(Filter::$msgs)) {
              $data = array(
                  'displayname' => sanitize($_POST['displayname']),
                  'extra' => sanitize($_POST['extra']),
                  'extra2' => sanitize($_POST['extra2']),
                  'extra3' => sanitize($_POST['extra3']),
                  'demo' => intval($_POST['demo']),
                  'active' => intval($_POST['active']));

              self::$db->update(self::gTable, $data, "id='" . (int)Filter::$id . "'");
              (self::$db->affected()) ? Filter::msgOk('<span>Success!</span>Gateway Configuration Updated Successfully') : Filter::msgAlert('<span>Alert!</span>Nothing to process.');
          } else
              print Filter::msgStatus();
      }

      /**
       * Membership::processBuilder()
       * 
       * @return
       */
      public static function processBuilder()
      {

          Filter::checkPost('pagename', "Please enter Valid Page Name!");
          Filter::checkPost('membership_id', "Please Select at least one membership type!");

          if (empty(Filter::$msgs)) {
              $pagename = sanitize($_POST['pagename']);
              $pagename = preg_replace("/&([a-zA-Z])(uml|acute|grave|circ|tilde|ring),/", "", $pagename);
              $pagename = preg_replace("/[^a-zA-Z0-9_.-]/", "", $pagename);
              $pagename = str_replace(array('---', '--'), '-', $pagename);
              $pagename = str_replace(array('..', '.'), '', $pagename);

              $header = intval($_POST['header']);

              $mids = $_POST['membership_id'];
              $total = count($mids);
              $i = 1;
              if (is_array($mids)) {
                  $midata = '';
                  foreach ($mids as $mid) {
                      if ($i == $total) {
                          $midata .= $mid;
                      } else
                          $midata .= $mid . ",";
                      $i++;
                  }
              }
              $mem_id = $midata;
              $access = Registry::get("Users")->checkMembership($mem_id);

              $data = "<?php \n" 
			  . "\t/** \n" 
			  . "\t* " . $pagename . "\n" 
			  . "\t*" . " \n" 
			  . "\t* @package Membership Manager Pro\n" 
			  . "\t* @author wojoscripts.com\n" 
			  . "\t* @copyright 2011\n" 
			  . "\t* @version Id: " . $pagename . ".php, v2.50 " . date('Y-m-d H:i:s') . " gewa Exp $\n" 
			  . "\t*/\n" 
			  . " \n" 
			  . "\t define(\"_VALID_PHP\", true); \n" 
			  . "\t require_once(\"init.php\");\n" 
			  . " \n" . "?>";

              if ($header == 1) {
                  $data .= "" . " \n" 
				  . " \n" . " <?php include(\"header.php\");?> \n" 
				  . " \n" . " \n";
              }

              $data .= "" 
			  . "\t <?php if(\$access): ?>\n" 
			  . " \n" 
			  . "\t <h1>User has valid membership, you can display your protected content here</h1>.\n" 
			  . " \n" . "\t <?php else: ?>\n" 
			  . " \n" . "\t <h1>User membership is't not valid. Show your custom error message here</h1>\n" 
			  . " \n" . "\t <?php endif; ?>\n" 
			  . "";

              if ($header == 1) {
                  $data .= "" . " \n" 
				  . " \n" . " <?php include(\"footer.php\");?> \n" 
				  . " \n" 
				  . " \n";
              }

              $pagefile = UPLOADS . $pagename . '.php';
              if (is_writable(UPLOADS)) {
                  $handle = fopen($pagefile, 'w');
                  fwrite($handle, $data);
                  fclose($handle);
                  Filter::msgOk('<span>Success!</span>Page <strong>' . $pagename . '</strong> created successfully!');
              } else {
                  Filter::msgError('<span>Error!</span>There was an error creating <strong>' . $pagename . '</strong> Make sure your uploads directory is writable!');
              }

          } else
              print Filter::msgStatus();
      }


      /**
       * Membership::verifyTxnId()
       * 
       * @param mixed $txn_id
       * @return
       */
      public function verifyTxnId($txn_id)
      {

          $sql = self::$db->query("SELECT id" 
		  . "\n FROM " . self::pTable
		  . "\n WHERE txn_id = '" . sanitize($txn_id) . "'" 
		  . "\n LIMIT 1");

          if (self::$db->numrows($sql) > 0)
              return false;
          else
              return true;
      }
  }
?>