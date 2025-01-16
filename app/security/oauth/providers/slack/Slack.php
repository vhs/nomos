<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 12:10 PM.
 */

namespace app\security\oauth\providers\slack;

use app\security\oauth\providers\slack\SlackProviderException;
use League\OAuth2\Client\Grant\AbstractGrant;
use League\OAuth2\Client\Provider\AbstractProvider;
use League\OAuth2\Client\Provider\ResourceOwnerInterface;
use League\OAuth2\Client\Token\AccessToken;
use Psr\Http\Message\ResponseInterface;

class Slack extends AbstractProvider {
    public const ACCESS_TOKEN_RESOURCE_OWNER_ID = 'authed_user';

    public $authorizationHeader = 'token';

    public $domain = 'https://vanhack.slack.com';

    public $team = '';

    public function createResourceOwner($response, AccessToken $token): ResourceOwnerInterface {
        return new SlackUser($response);
    }

    public function getBaseAccessTokenUrl(array $params): string {
        return $this->domain . '/api/oauth.v2.access';
    }

    public function getBaseAuthorizationUrl() {
        return $this->domain . '/oauth/v2/authorize';
    }

    public function getResourceOwnerDetailsUrl(AccessToken $token) {
        return $this->domain . '/api/auth.test?token=' . $token;
    }

    protected function checkResponse(ResponseInterface $response, $data) {
        if (isset($data['ok']) && $data['ok'] !== true) {
            return SlackProviderException::fromResponse($response, $data['error']);
        }
    }

    protected function createAccessToken(array $response, AbstractGrant $grant) {
        if (isset($response['authed_user'])) {
            return new AccessToken($response['authed_user']);
        }

        return new AccessToken($response['authed_user']);
    }

    protected function getDefaultScopes() {
        return [];
    }
}
