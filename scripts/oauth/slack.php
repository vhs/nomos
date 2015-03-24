<?php

require_once(dirname(__FILE__) . "/../../conf/config.ini.php");
require_once(dirname(__FILE__) . "/../../vendor/autoload.php");

define("_VALID_PHP", true);
require_once("../init.php");
require_once("oauth.php");
require_once("./provider/slack.php");
$host = OauthHelper::redirectHost();

$action = $_GET["action"] ?: "link";

$provider = new League\OAuth2\Client\Provider\Slack([
    'clientId'      => OAUTH_SLACK_CLIENT,
    'clientSecret'  => OAUTH_SLACK_SECRET,
    'teamId'          => OAUTH_SLACK_TEAM,
    'redirectUri'   => $host.'/oauth/slack.php?action='.$action,
    'scopes'        => [ 'identify' ],
]);

$oauthHelper = new OauthHelper($provider);

$userDetails = null;

if (!isset($_GET['code'])) {
    $oauthHelper->requestAuth();
} else {
    $userDetails = $oauthHelper->processToken();
}

if ($_GET['action'] == 'link' && !is_null($userDetails)) {
    $oauthHelper->linkAccount($userDetails->uid, 'slack', "Slack Account for " . $userDetails->nickname);
    header('Location: /index.html#/profile/');
    die();
}

