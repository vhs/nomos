<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 12:10 PM
 */

namespace app\security\oauth\providers;

use League\OAuth2\Client\Entity\User;
use League\OAuth2\Client\Provider\AbstractProvider;
use League\OAuth2\Client\Token\AccessToken;

class Slack extends AbstractProvider {
    public $authorizationHeader = 'token';

    public $teamId = '';

    public $domain = 'https://slack.com';

    public function urlAuthorize() {
        return $this->domain . '/oauth/authorize';
    }

    public function urlAccessToken() {
        return $this->domain . '/api/oauth.access';
    }

    public function urlUserDetails(AccessToken $token) {
        return $this->domain . '/api/auth.test?token=' . $token;
    }

    public function getAuthorizationUrl($options = []) {
        $this->state = isset($options['state']) ? $options['state'] : md5(uniqid(rand(), true));

        $params = [
            'client_id' => $this->clientId,
            'redirect_uri' => $this->redirectUri,
            'state' => $this->state,
            'team' => $this->teamId,
            'scope' => is_array($this->scopes) ? implode($this->scopeSeparator, $this->scopes) : $this->scopes,
            'response_type' => isset($options['response_type']) ? $options['response_type'] : 'code',
            'approval_prompt' => isset($options['approval_prompt']) ? $options['approval_prompt'] : 'auto'
        ];

        return $this->urlAuthorize() . '?' . $this->httpBuildQuery($params, '', '&');
    }

    public function userDetails($response, AccessToken $token) {
        $user = new User();

        $user->exchangeArray([
            'uid' => $response->user_id,
            'nickname' => $response->user,
            'team' => $response->team
        ]);

        return $user;
    }
}
