<?php
  /**
   * Logout
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2010
   * @version $Id: logout.php, v2.00 2011-04-20 10:12:05 gewa Exp $
   */
  define("_VALID_PHP", true);
  
  require_once("../init.php");
?>
<?php
  if ($user->logged_in)
      $user->logout();
	  
  redirect_to("login.php");
?>