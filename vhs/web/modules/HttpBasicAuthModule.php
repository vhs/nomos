<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 11:56 AM.
 */

namespace vhs\web\modules;

use vhs\security\IAuthenticate;
use vhs\security\UserPassCredentials;
use vhs\web\HttpBasicCredentials;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

/** @typescript */
class HttpBasicAuthModule implements IHttpModule {
    /**
     * authorizer.
     *
     * @var mixed
     */
    private $authorizer;

    /**
     * realm.
     *
     * @var mixed
     */
    private $realm;

    /**
     * __construct.
     *
     * @param mixed                       $realm
     * @param \vhs\security\IAuthenticate $authorizer
     *
     * @return void
     */
    public function __construct($realm, IAuthenticate $authorizer) {
        $this->realm = $realm;
        $this->authorizer = $authorizer;
    }

    /**
     * endResponse.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
    public function endResponse(HttpServer $server) {}

    /**
     * handle.
     *
     * @param \vhs\web\HttpServer $server
     *
     * @return void
     */
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

    /**
     * handleException.
     *
     * @param \vhs\web\HttpServer $server
     * @param \Exception          $ex
     *
     * @return void
     */
    public function handleException(HttpServer $server, \Exception $ex) {
        if (get_class($ex) === 'vhs\\security\\exceptions\\UnauthorizedException') {
            $this->requestAuth($server, $ex->getMessage());
        }
    }

    /**
     * requestAuth.
     *
     * @param \vhs\web\HttpServer $server
     * @param mixed               $message
     *
     * @return void
     */
    private function requestAuth(HttpServer $server, $message) {
        $server->clear();
        $server->header('WWW-Authenticate: Basic realm="' . $this->realm . '"');
        $server->header('HTTP/1.0 401 Unauthorized');
        $server->code(401);
        $server->output($message);
        $server->end();
    }
}
