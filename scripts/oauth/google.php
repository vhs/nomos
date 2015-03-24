<?php

require_once(dirname(__FILE__) . "/../../conf/config.ini.php");
require_once(dirname(__FILE__) . "/../../vendor/autoload.php");

define("_VALID_PHP", true);
require_once("../init.php");
require_once("oauth.php");

$host = OauthHelper::redirectHost();

$action = $_GET["action"] ?: "link";

$provider = new League\OAuth2\Client\Provider\Google([
    'clientId'      => OAUTH_GOOGLE_CLIENT,
    'clientSecret'  => OAUTH_GOOGLE_SECRET,
    'redirectUri'   => $host.'/oauth/google.php?action='.$action,
    'scopes'        => [ 'email' ],
    ]);

$oauthHelper = new OauthHelper($provider);

$userDetails = null;

if (!isset($_GET['code'])) {
    $oauthHelper->requestAuth();
} else {
    $userDetails = $oauthHelper->processToken();
}

if ($_GET['action'] == 'link' && !is_null($userDetails)) {
    $oauthHelper->linkAccount($userDetails->uid, 'google', "Google Account for " . $userDetails->name);
    header('Location: /index.html#/profile/');
    die();
}

