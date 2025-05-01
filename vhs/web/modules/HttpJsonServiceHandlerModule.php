<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 12:25 PM.
 */

namespace vhs\web\modules;

use vhs\services\exceptions\InvalidRequestException;
use vhs\services\ServiceRegistry;
use vhs\web\enums\HttpStatusCodes;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

/** @typescript */
class HttpJsonServiceHandlerModule implements IHttpModule {
    /**
     * registryKey.
     *
     * @var mixed
     */
    private $registryKey;

    /**
     * __construct.
     *
     * @param mixed $registryKey
     *
     * @return void
     */
    public function __construct($registryKey) {
        $this->registryKey = $registryKey;
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
     * @throws \vhs\services\exceptions\InvalidRequestException
     *
     * @return void
     */
    public function handle(HttpServer $server) {
        $input = null;

        $server->header('Content-Type: application/json', true);

        $uri = $server->request->url;

        try {
            switch ($server->request->method) {
                case 'HEAD':
                    $server->output(ServiceRegistry::get($this->registryKey)->discover($uri));

                    $server->end();

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

                    $server->logger->debug(__FILE__, __LINE__, __METHOD__, 'setting end');

                    break;
                //case 'PUT':
                //case 'DELETE':
                default:
                    throw new InvalidRequestException();
                // TODO clean up
                // break;
            }

            $server->logger->debug(__FILE__, __LINE__, __METHOD__, 'setting end');
            $server->end();
        } catch (\Throwable $exception) {
            $server->logger->debug(
                __FILE__,
                __LINE__,
                __METHOD__,
                sprintf('caught exception: %s(%s)', $exception->getMessage(), $exception->getCode())
            );

            if ($exception->getCode() !== HttpStatusCodes::Client_Error_Misdirected_Request->value) {
                throw $exception;
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
    public function handleException(HttpServer $server, \Exception $ex) {}
}
