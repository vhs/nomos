<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:25 PM
 */

namespace vhs\web\modules;


use vhs\services\ServiceRegistry;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

class HttpJsonServiceHandlerModule implements IHttpModule {

    private $registryKey;

    public function __construct($registryKey) {
        $this->registryKey = $registryKey;
    }

    public function handle(HttpServer $server) {
        $input = null;
        if(isset($_GET['json'])) {
            $input = $_GET['json'];
        } else {
            $input = json_encode($_GET);
        }

        $server->output(
            ServiceRegistry::get($this->registryKey)->handle($_SERVER["SCRIPT_NAME"], $input)
        );
    }

    public function handleException(HttpServer $server, \Exception $ex) {
        $server->output($ex->getMessage());
    }
}