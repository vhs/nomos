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

/** @typescript */
class Slack extends AbstractProvider {
    public const ACCESS_TOKEN_RESOURCE_OWNER_ID = 'authed_user';

    /**
     * authorizationHeader.
     *
     * @var string
     */
    public $authorizationHeader = 'token';

    /**
     * domain.
     *
     * @var string
     */
    public $domain = 'https://vanhack.slack.com';

    /**
     * team.
     *
     * @var string
     */
    public $team = '';

    /**
     * createResourceOwner.
     *
     * @param mixed                                   $response
     * @param \League\OAuth2\Client\Token\AccessToken $token
     *
     * @return ResourceOwnerInterface
     */
    public function createResourceOwner($response, AccessToken $token): ResourceOwnerInterface {
        return new SlackUser($response);
    }

    /**
     * getBaseAccessTokenUrl.
     *
     * @param mixed $params
     *
     * @return string
     */
    public function getBaseAccessTokenUrl(mixed $params): string {
        return $this->domain . '/api/oauth.v2.access';
    }

    /**
     * getBaseAuthorizationUrl.
     *
     * @return string
     */
    public function getBaseAuthorizationUrl() {
        return $this->domain . '/oauth/v2/authorize';
    }

    /**
     * getResourceOwnerDetailsUrl.
     *
     * @param \League\OAuth2\Client\Token\AccessToken $token
     *
     * @return string
     */
    public function getResourceOwnerDetailsUrl(AccessToken $token) {
        return $this->domain . '/api/auth.test?token=' . $token;
    }

    /**
     * checkResponse.
     *
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param array|string                        $data
     *
     * @throws \app\security\oauth\providers\slack\SlackProviderException
     *
     * @return void
     *
     * @phpstan-ignore missingType.iterableValue
     */
    protected function checkResponse(ResponseInterface $response, $data) {
        if (isset($data['ok']) && $data['ok'] !== true) {
            SlackProviderException::fromResponse($response, $data['error']);
        }
    }

    /**
     * createAccessToken.
     *
     * @param array<string,mixed>                       $response
     * @param \League\OAuth2\Client\Grant\AbstractGrant $grant
     *
     * @return \League\OAuth2\Client\Token\AccessToken
     */
    protected function createAccessToken(array $response, AbstractGrant $grant) {
        if (isset($response['authed_user'])) {
            return new AccessToken($response['authed_user']);
        }

        return new AccessToken($response['authed_user']);
    }

    /**
     * getDefaultScopes.
     *
     * @return string[]
     */
    protected function getDefaultScopes() {
        return [];
    }
}
