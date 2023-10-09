<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 11:56 AM
 */

namespace vhs\web\modules;

use vhs\security\IAuthenticate;
use vhs\security\UserPassCredentials;
use vhs\web\HttpBasicCredentials;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

class HttpBasicAuthModule implements IHttpModule {
    private $realm;
    private $authorizer;

    public function __construct($realm, IAuthenticate $authorizer) {
        $this->realm = $realm;
        $this->authorizer = $authorizer;
    }

    public function handle(HttpServer $server) {
        if (array_key_exists('PHP_AUTH_USER', $_SERVER) && $_SERVER['PHP_AUTH_USER'] && !$this->authorizer->isAuthenticated()) {
            try {
                $this->authorizer->login(new UserPassCredentials($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']));
            } catch (\Exception $ex) {
                //$this->requestAuth($server, $ex->getMessage());

                $server->log('Login attempt failed: ' . $ex->getMessage());
                $server->clear();
                $server->code(500);
                $server->output($ex->getMessage());
                $server->end();
            }
        }
    }

    public function handleException(HttpServer $server, \Exception $ex) {
        if (get_class($ex) === 'vhs\\security\\exceptions\\UnauthorizedException') {
            $this->requestAuth($server, $ex->getMessage());
        }
    }

    private function requestAuth(HttpServer $server, $message) {
        $server->clear();
        $server->header('WWW-Authenticate: Basic realm="' . $this->realm . '"');
        $server->header('HTTP/1.0 401 Unauthorized');
        $server->code(401);
        $server->output($message);
        $server->end();
    }

    public function endResponse(HttpServer $server) {
    }
}
