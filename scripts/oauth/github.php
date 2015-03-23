<?php

use app\security\Authenticate;
use vhs\security\CurrentUser;
use app\domain\Key;

require_once(dirname(__FILE__) . "/../../conf/config.ini.php");
require_once(dirname(__FILE__) . "/../../vendor/autoload.php");

define("_VALID_PHP", true);
require_once("../init.php");
require_once("oauth.php");

$host = OauthHelper::redirectHost();

$action = $_GET["action"] ?: "link";

$provider = new League\OAuth2\Client\Provider\Github([
    'clientId'      => OAUTH_GITHUB_CLIENT,
    'clientSecret'  => OAUTH_GITHUB_SECRET,
    'redirectUri'   => $host.'/oauth/github.php?action='.$action,
    'scopes'        => [ ],
    ]);

$oauthHelper = new OauthHelper($provider);

$userDetails = null;

if (!isset($_GET['code'])) {
    $oauthHelper->requestAuth();
} else {
    $userDetails = $oauthHelper->processToken();
}

if ($_GET['action'] == 'link' && !is_null($userDetails)) {
    $oauthHelper->linkAccount($userDetails->uid, 'github', "GitHub Account for " . $userDetails->nickname);
    header('Location: /index.html#/profile/');
    die();
}

