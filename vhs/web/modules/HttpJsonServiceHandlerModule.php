<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:25 PM
 */

namespace vhs\web\modules;

use vhs\services\exceptions\InvalidRequestException;
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

        $server->header('Content-Type: application/json', true);

        $uri = $server->request->url;

        switch ($server->request->method) {
            case 'HEAD':
                $server->output(ServiceRegistry::get($this->registryKey)->discover($uri));
                break;
            case 'GET':
                if (isset($_GET['json'])) {
                    $input = $_GET['json'];
                } else {
                    $input = json_encode($_GET);
                }

                $server->output(ServiceRegistry::get($this->registryKey)->handle($uri, $input));
                break;
            case 'POST':
                $server->output(ServiceRegistry::get($this->registryKey)->handle($uri, file_get_contents('php://input')));
                break;
            //case 'PUT':
            //case 'DELETE':
            default:
                throw new InvalidRequestException();
                break;
        }
    }

    public function handleException(HttpServer $server, \Exception $ex) {
    }

    public function endResponse(HttpServer $server) {
    }
}
