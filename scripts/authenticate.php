<?php 

	/** 
	* authenticate
	* 
	* @package Membership Manager Pro
	* @author JARRETT GODDAMMIT
	* @copyright 2000 AND GODDAMN 14
	* @version Id: authenticate.php, v2.50 2014-09-04 22:07:42 gewa Exp $
	*/
 
	 define("_VALID_PHP", true); 
	 require_once("init.php");
	 
	 
	 
	if(isset($_GET['rfid'])) {
		$key = mysql_real_escape_string($_GET['rfid']);
	} else {
		$key = -1;
	}

	if($RFID->auth($key) == 1) {
		die("AUTHORIZED");
	} else {
		die("UNAUTHORIZED");
	}

 ?> 
 
 
