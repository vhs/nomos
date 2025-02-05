<?php

namespace app\security\oauth\providers\slack;

use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Psr\Http\Message\ResponseInterface;

/** @typescript */
class SlackProviderException extends IdentityProviderException {
    public static function fromResponse(ResponseInterface $response, $message = null) {
        throw new static($message, $response->getStatusCode(), (string) $response->getBody());
    }
}
