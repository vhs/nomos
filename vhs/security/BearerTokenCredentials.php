<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 1:31 PM
 */

namespace vhs\security;


class BearerTokenCredentials implements ICredentials {

    private $token;
    private $clientId;
    private $clientSecret;

    public function __construct($token, $clientId, $clientSecret) {
        $this->token = $token;
        $this->clientId = $clientId;
        $this->clientSecret = $clientSecret;
    }

    public function getToken() { return $this->token; }
    public function getClientId() { return $this->clientId; }
    public function getClientSecret() { return $this->clientSecret; }
}
