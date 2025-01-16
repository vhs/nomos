<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 11:05 AM.
 */

namespace app\security\oauth\modules;

use app\security\oauth\OAuthHelper;
use app\security\oauth\providers\slack\Slack;
use vhs\web\HttpServer;

class SlackOAuthHandler extends OAuthHandler {
    public function getUrl() {
        return '/oauth/slack.php';
    }

    public function handle(HttpServer $server) {
        $host = OauthHelper::redirectHost();

        $action = $_GET['action'] ?: 'link';

        $baseOptions = [
            'clientId' => OAUTH_SLACK_CLIENT,
            'clientSecret' => OAUTH_SLACK_SECRET,
            'redirectUri' => $host . $this->getUrl() . '?action=' . $action,
            'team' => OAUTH_SLACK_TEAM,
            'user_scope' => ['identify']
        ];

        $options = [...$baseOptions];

        $provider = new Slack($options);

        $oauthHelper = new OauthHelper($provider, $server);

        $userDetails = null;

        if (!isset($_GET['code'])) {
            $oauthHelper->requestAuth(['team' => OAUTH_SLACK_TEAM, 'user_scope' => 'identify']);
        } else {
            /** @var SlackResourceOwner | null */
            $userDetails = $oauthHelper->processToken();
        }

        if ($_GET['action'] == 'link' && !is_null($userDetails)) {
            $oauthHelper->linkAccount($userDetails->getId(), 'slack', 'Slack Account for ' . $userDetails->getName());

            $server->clear();
            $server->redirect('/index.html#/profile/');
            $server->end();
        }
    }
}
