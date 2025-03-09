<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:17 PM.
 */

namespace app\security;

use app\security\credentials\ApiCredentials;
use vhs\security\exceptions\UnauthorizedException;
use vhs\security\IAuthenticate;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

/** @typescript */
class HttpApiAuthModule implements IHttpModule {
    private $authorizer;

    public function __construct(IAuthenticate $authorizer) {
        $this->authorizer = $authorizer;
    }

    public function endResponse(HttpServer $server) {
        if (array_key_exists('X-Api-Key', $server->request->headers) && $this->authorizer->isAuthenticated()) {
            $this->authorizer->logout();
        }
    }

    public function handle(HttpServer $server) {
        if (array_key_exists('X-Api-Key', $server->request->headers) && !$this->authorizer->isAuthenticated()) {
            try {
                $this->authorizer->login(new ApiCredentials($server->request->headers['X-Api-Key']));
            } catch (\Exception $ex) {
                throw new UnauthorizedException($ex->getMessage());
            }
        }
    }

    public function handleException(HttpServer $server, \Exception $ex) {
        if (get_class($ex) === 'vhs\\security\\exceptions\\UnauthorizedException') {
            $server->clear();
            $server->header('HTTP/1.0 401 Unauthorized');
            $server->code(401);
            $server->end();
        }
    }
}
