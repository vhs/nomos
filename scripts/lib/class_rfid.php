<?php
  /**
   * RFID Class
   *
   * @package Membership Manager Pro
   * @author Jarrett
   * @copyright 2014
   * @version $Id: class_rfid.php, v1.00 2014-09-06 20:34:06 gewa Exp $
   */

use app\model\Key;

if (!defined("_VALID_PHP"))
      die('Direct access to this location is not allowed.');

  class RFID
  {
      const rTable = "accesslog";
      public $id = 0;
      public $rfid;
	  public $last;
      //private static $db;


      /**
       * RFID::__construct()
       * 
       * @return
       */
      function __construct()
      {
          //self::$db = Registry::get("Database");

      }

 
      /**
       * RFID::log()
       *  
       * @param mixed $rfid
       * @param mixed $authorized
       * @return bool
       **/
      function log($rfid, $authorized)
      {
          $entry = new \app\model\AccessLog();

          $entry->time = date('Y-m-d H:i:s');
		  $entry->rfid_key = sanitize($rfid);
          $entry->authorized = $authorized;
		  $entry->from_ip = $_SERVER['REMOTE_ADDR'];
		  
          return $entry->save();
      }
 
      /**
       * RFID::auth()
       *  
       * @param mixed $rfid
       * @return
       **/
      function auth($rfid)
      {

		  //print("auth\n");
		  $rfid = strtoupper($rfid);
		  

          $key = Key::findByRfid($rfid);


          // \app\model\User::where(Where::Equal("rfid", $rfid));
		  
		  
          $sql = "SELECT active,membership_id FROM users WHERE rfid = '" . self::$db->escape($rfid) . "'";
          $result = self::$db->query($sql);
          if (!$result || (self::$db->numrows($result) < 1)) {
			  self::log($rfid, 0);
              return 0;
          }

          $row = self::$db->fetch($result);
		  
          if ($row->active == "y" && $row->membership_id == 7) {
			  self::log($rfid, 1);
              return 1;
          } else {
			  self::log($rfid, 0);
              return 0;
          }
      }
 
      /**
       * RFID::getRFID()
       *  
       * @param mixed $userid
       * @return
       **/
      function getRFID($userid)
      {

		  $userid = intval($userid);
		  
          $sql = "SELECT rfid FROM users WHERE id = $userid";
          $result = self::$db->query($sql);
          if (!$result || (self::$db->numrows($result) < 1)) {
              return 0;
          }

          $row = self::$db->fetch($result);
		  
          if ($row->rfid == '') {
              return 0;
          } else {
              return $row->rfid;
          }
      }
 
      /**
       * RFID::getLatest()
       *  
       * @return
       **/
      function getLatest()
      {

		  
		  
          $sql = "SELECT * FROM accesslog WHERE rfid_key is not null ORDER BY `time` DESC LIMIT 0,15";
          $result = self::$db->query($sql);
          if (!$result || (self::$db->numrows($result) < 1)) {
              return 0;
          }
		  $i = 0;
		  
          while($row = self::$db->fetch($result)) {
			  $time = new DateTime($row->time);
			  $now = new DateTime(date('Y-m-d H:i:s'));
			  $age = $now->diff($time);
			  
			  if($age->y == 0 && $age->m == 0 && $age->d == 0 && $age->h == 0 && $age->i <= 5) {
			      $out[$i] = $row->rfid_key;
				  $i++;
				  if($i >= 5) {
				      return $out;
				  }
			  }
		  }
		  if(isset($out)) {
		      return $out;
		  } 
		  return 0;
		  
      }

  }
?>
