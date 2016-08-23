<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 1:29 PM
 */

namespace vhs\web\modules;


use vhs\security\BearerTokenCredentials;
use vhs\security\IAuthenticate;
use vhs\security\UserPassCredentials;
use vhs\web\HttpBasicCredentials;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

class HttpBearerTokenAuthModule implements IHttpModule {

    private $authorizer;
    private $headerKey = "HTTP_AUTHORIZATION";

    public function __construct(IAuthenticate $authorizer) {
        $this->authorizer = $authorizer;
    }

    public function handle(HttpServer $server) {

        $bearerToken = null;

        $authorization = (array_key_exists($this->headerKey, $_SERVER)) ? $_SERVER[$this->headerKey] : null;

        if (!is_null($authorization) && substr($authorization, 0, 7) === "Bearer ") {
            $bearerToken = substr($authorization, 7, strlen($authorization));
        }

        if(!is_null($bearerToken)) {
            try {
                $this->authorizer->login(new BearerTokenCredentials($bearerToken));
            }  catch(\Exception $ex) {
                $server->log("Login attempt failed: " . $ex->getMessage());
                $server->clear();
                $server->code(500);
                $server->output($ex->getMessage());
                $server->end();
            }
        }
    }

    public function handleException(HttpServer $server, \Exception $ex) { }

    public function endResponse(HttpServer $server) { }
}
