<?php

namespace app\security\oauth\providers\slack;

use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Psr\Http\Message\ResponseInterface;

/** @typescript */
final class SlackProviderException extends IdentityProviderException {
    /**
     * fromResponse.
     *
     * @param \Psr\Http\Message\ResponseInterface $response
     * @param mixed                               $message
     *
     * @throws \app\security\oauth\providers\slack\SlackProviderException
     *
     * @return void
     */
    public static function fromResponse(ResponseInterface $response, $message = null) {
        throw new static($message, $response->getStatusCode(), (string) $response->getBody());
    }
}
