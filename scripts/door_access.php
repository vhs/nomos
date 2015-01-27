<?php

use app\security\Authenticate;
use vhs\security\CurrentUser;
use vhs\services\ServiceClient;

define("_VALID_PHP", true);
  require_once("init.php");

  if (!Authenticate::isAuthenticated())
      redirect_to("index.php");


 
include("header.php");


?> 
<style>
.spoiler {
	background: black;
	color: black;
	padding: 5px;
}

.spoiler:hover {
	color: white;
	background: black;
}

</style> 
	 <?php


	 $user = vhs\services\ServiceClient::web_UserService1_GetUser(vhs\security\CurrentUser::getIdentity());
//<?=$user->fname
	 if($user->membership->code == 'key-holder'): ?>
<div class="doorinfo fullform xform">
<?php 

//Keyholder: in table email_templates, display body where column id = 17
$email = new app\domain\Email;
$what = $email::findById(17);

//print($email->email_templates->body);

print_r($what);

?>
	 <?php else: ?>
 
	 <h1>Hey! You're not a keyholder. If you've been a member for three months, you can become one, though.</h1>
 
	 <?php endif; ?>
 
 
 <?php include("footer.php");?> 
 
 
