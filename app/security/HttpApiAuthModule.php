<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:17 PM
 */

namespace app\security;


use app\security\credentials\ApiCredentials;
use vhs\security\IAuthenticate;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

class HttpApiAuthModule implements IHttpModule {

    private $authorizer;

    public function __construct(IAuthenticate $authorizer) {
        $this->authorizer = $authorizer;
    }

    public function handle(HttpServer $server) {
        if(isset($server->request->headers["X-Api-Token"]) && !$this->authorizer->isAuthenticated()) {
            $this->authorizer->login(new ApiCredentials($server->request->headers["X-Api-Token"]));
        }
    }

    public function handleException(HttpServer $server, \Exception $ex) {

    }
}