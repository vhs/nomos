<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 11:49 AM.
 */

namespace vhs\web;

use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\services\exceptions\InvalidRequestException;
use vhs\web\enums\HttpStatusCodes;
use vhs\web\modules\HttpServerInfoModule;

/** @typescript */
class HttpServer {
    /**
     * logger.
     *
     * @var \vhs\Logger
     */
    public $logger;

    /**
     * request.
     *
     * @var \vhs\web\HttpRequest
     */
    public $request;

    /**
     * endset.
     *
     * @var bool
     */
    private $endset = false;

    /**
     * handling.
     *
     * @var bool
     */
    private $handling = false;

    /**
     * headerBuffer.
     *
     * @var callable[]
     */
    private $headerBuffer = [];

    /**
     * http_response_code.
     *
     * @var mixed
     */
    private $http_response_code;

    /**
     * modules.
     *
     * @var \vhs\web\IHttpModule[]
     */
    private $modules = [];

    /**
     * outputBuffer.
     *
     * @var callable[]
     */
    private $outputBuffer = [];

    /**
     * __construct.
     *
     * @param \vhs\web\modules\HttpServerInfoModule $infoModule
     * @param \vhs\Logger                           $logger
     *
     * @return void
     */
    public function __construct(?HttpServerInfoModule $infoModule = null, ?Logger &$logger = null) {
        if (is_null($logger)) {
            $this->logger = new SilentLogger();
        } else {
            $this->logger = &$logger;
        }

        if (is_null($infoModule)) {
            $this->register(new HttpServerInfoModule());
        } else {
            $this->register($infoModule);
        }
    }

    /**
     * clear.
     *
     * @return void
     */
    public function clear() {
        if ($this->endset) {
            return;
        }

        unset($this->headerBuffer);
        $this->headerBuffer = [];
        unset($this->outputBuffer);
        $this->outputBuffer = [];
        $this->http_response_code = HttpStatusCodes::Success_Ok;
    }

    /**
     * code.
     *
     * @param mixed $code
     *
     * @return void
     */
    public function code($code) {
        if ($this->endset) {
            return;
        }

        $this->http_response_code = $code;
    }

    /**
     * end.
     *
     * @return void
     */
    public function end() {
        $this->logger->debug(__FILE__, __LINE__, __METHOD__, 'trying end');

        if ($this->endset) {
            $this->logger->debug(__FILE__, __LINE__, __METHOD__, 'already ended - bailing');

            return;
        }

        $this->logger->debug(__FILE__, __LINE__, __METHOD__, 'setting end');

        $this->endset = true;
        $self = $this;
        array_push($this->outputBuffer, function () use ($self) {
            $self->endResponse();
        });
    }

    /**
     * handle.
     *
     * @return void
     */
    public function handle() {
        $this->handling = true;
        $this->clear();

        $this->request = HttpUtil::getCurrentRequest();

        session_set_cookie_params(['SameSite' => 'Lax', 'HttpOnly' => 'true']);
        session_start();

        $exception = null;
        $index = 0;

        /** @var IHttpModule $module */
        foreach ($this->modules as $module) {
            $this->logger->debug(__FILE__, __LINE__, __METHOD__, sprintf('trying module: %s', get_class($module)));

            if ($this->endset) {
                break;
            }

            try {
                $module->handle($this);
            } catch (\Exception $ex) {
                $exception = $ex;

                break;
            }
            $index += 1;
        }

        if (!$this->endset && is_null($exception)) {
            $exception = new InvalidRequestException('No valid service endpoint found', HttpStatusCodes::Server_Error_Service_Unavailable);
        }

        $this->log($this->request->method . ' ' . $this->request->url . ' ' . json_encode($this->request->headers));

        if (!is_null($exception)) {
            /** @var IHttpModule $module */
            foreach (array_reverse(array_slice($this->modules, 0, $index + 1)) as $module) {
                $module->handleException($this, $exception);
            }
        }

        //$this->end();

        http_response_code($this->http_response_code);

        foreach ($this->headerBuffer as $header) {
            $header();
        }

        foreach ($this->outputBuffer as $output) {
            $output();
        }

        $this->endResponse();
    }

    /**
     * header.
     *
     * @param mixed $string
     * @param mixed $replace
     * @param mixed $http_response_code
     *
     * @return void
     */
    public function header($string, $replace = true, $http_response_code = 0) {
        if ($this->endset) {
            return;
        }

        $self = $this;

        array_push($this->headerBuffer, function () use ($string, $replace, $http_response_code) {
            if (headers_sent() === false) {
                header($string, $replace, $http_response_code);
            }
        });
    }

    /**
     * log.
     *
     * @param mixed $message
     *
     * @return void
     */
    public function log($message) {
        $this->logger->log($message);
    }

    /**
     * output.
     *
     * @param mixed $data
     *
     * @return void
     */
    public function output($data) {
        if ($this->endset) {
            return;
        }

        array_push($this->outputBuffer, function () use ($data) {
            echo $data;
        });
    }

    /**
     * redirect.
     *
     * @param string $url
     * @param bool   $permanent
     *
     * @return void
     */
    public function redirect($url, $permanent = false) {
        if ($this->endset) {
            return;
        }

        $this->header('Location: ' . $url, true, $permanent ? 301 : 302);
    }

    /**
     * register.
     *
     * @param \vhs\web\IHttpModule $module
     *
     * @return void
     */
    public function register(IHttpModule $module) {
        if ($this->handling) {
            $this->log('Failed to register module ' . get_class($module));

            throw new \Exception('Registrations must occur prior to handling a request');
        }

        array_push($this->modules, $module);
    }

    /**
     * sendOnlyHeaders.
     *
     * @return void
     */
    public function sendOnlyHeaders() {
        if ($this->endset) {
            return;
        }

        $self = $this;
        array_push($this->headerBuffer, function (): never {
            exit();
        });
    }

    /**
     * endResponse.
     *
     * @return void
     */
    private function endResponse() {
        $exception = null;
        $index = 0;

        /** @var IHttpModule $module */
        foreach ($this->modules as $module) {
            try {
                $module->endResponse($this);
            } catch (\Exception $ex) {
                $exception = $ex;

                break;
            }
            $index += 1;
        }

        if (!is_null($exception)) {
            /** @var IHttpModule $module */
            foreach (array_reverse(array_slice($this->modules, 0, $index + 1)) as $module) {
                $module->handleException($this, $exception);
            }
        }

        exit();
    }
}
