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

<div class="doorinfo fullform xform">
	 <?php


	$user = vhs\services\ServiceClient::web_UserService1_GetUser(vhs\security\CurrentUser::getIdentity());
	$pinObj = vhs\services\ServiceClient::web_PinService1_GetUserPin(vhs\security\CurrentUser::getIdentity());
	$email = new app\domain\Email;

	
	 if($user->membership->code == 'key-holder') {

		//Keyholder: in table email_templates, display body where column id = 17
		$access = $email::find(17);

		$accessBody = $access->body;

		$pin = '0';
		if(!is_null($pinObj))
			$pin = str_replace("|", '', $pinObj->key);

		$accessBody = str_replace('[FNAME]', $user->fname, $accessBody);
		$accessBody = str_replace('[SUITE]', '104', $accessBody);
		$accessBody = str_replace('[OUTERPIN]', $pin, $accessBody);
		$accessBody = str_replace('[INNERPIN]', '1234', $accessBody);

		print(html_entity_decode($accessBody));

	} else {
			//Member: in table email_templates, display body where column id = 18
		$access = $email::find(18);

		$accessBody = $access->body;

		$pin = '0';
		if(!is_null($pinObj))
			$pin = str_replace("|", '', $pinObj->key);

		$accessBody = str_replace('[FNAME]', $user->fname, $accessBody);
		$accessBody = str_replace('[SUITE]', '104', $accessBody);
		$accessBody = str_replace('[USERPIN]', $pin, $accessBody);

		print(html_entity_decode($accessBody));
	}
 
 include("footer.php");?> 
 
 
