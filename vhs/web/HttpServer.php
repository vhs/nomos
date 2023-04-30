<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 11:49 AM
 */

namespace vhs\web;


use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\web\modules\HttpServerInfoModule;

class HttpServer {

    private $logger;
    private $handling = false;
    private $modules = array();
    private $headerBuffer = array();
    private $outputBuffer = array();
    private $http_response_code;
    private $endset = false;

    /** @var HttpRequest */
    public $request;

    public function __construct(HttpServerInfoModule $infoModule = null, Logger &$logger = null) {
        if(is_null($logger))
            $this->logger = new SilentLogger();
        else
            $this->logger = &$logger;

        if(is_null($infoModule))
            $this->register(new HttpServerInfoModule());
        else
            $this->register($infoModule);
    }

    public function log($message) {
        $this->logger->log($message);
    }

    public function register(IHttpModule $module) {
        if($this->handling) {
            $this->log("Failed to register module " . get_class($module));
            throw new \Exception("Registrations must occur prior to handling a request");
        }

        array_push($this->modules, $module);
    }

    public function handle() {
        $this->handling = true;
        $this->clear();

        $this->request = HttpUtil::getCurrentRequest();

        session_set_cookie_params(["SameSite" => "Strict", "HttpOnly" => "true"]);
        session_start();

        $exception = null;
        /** @var IHttpModule $module */
        $index = 0;
        foreach($this->modules as $module) {
            if($this->endset) break;

            try {
                $module->handle($this);
            } catch(\Exception $ex) {
                $exception = $ex;
                break;
            }
            $index += 1;
        }


        $this->log($this->request->method . " " . $this->request->url . " " . json_encode($this->request->headers));

        if(!is_null($exception)) {
            /** @var IHttpModule $module */
            foreach(array_reverse(array_slice($this->modules, 0, $index + 1)) as $module) {
                $module->handleException($this, $exception);
            }
        }

        //$this->end();

        http_response_code($this->http_response_code);

        foreach($this->headerBuffer as $header) {
            $header();
        }

        foreach($this->outputBuffer as $output) {
            $output();
        }

        $this->endResponse();
    }

    private function endResponse() {

        $exception = null;
        /** @var IHttpModule $module */
        $index = 0;
        foreach($this->modules as $module) {
            try {
                $module->endResponse($this);
            } catch(\Exception $ex) {
                $exception = $ex;
                break;
            }
            $index += 1;
        }

        if(!is_null($exception)) {
            /** @var IHttpModule $module */
            foreach(array_reverse(array_slice($this->modules, 0, $index + 1)) as $module) {
                $module->handleException($this, $exception);
            }
        }

        exit();
    }

    public function clear() {
        if($this->endset) return;

        unset($this->headerBuffer);
        $this->headerBuffer = array();
        unset($this->outputBuffer);
        $this->outputBuffer = array();
        $this->http_response_code = 200;
    }

    public function output($data) {
        if($this->endset) return;

        array_push($this->outputBuffer, function() use($data) {
            echo $data;
        });
    }

    public function redirect($url, $permanent = false) {
        if($this->endset) return;

        $this->header("Location: " . $url, true, ($permanent) ? 301 : 302);
    }

    public function header($string, $replace = true, $http_response_code = null) {
        if($this->endset) return;

        $self = $this;
        array_push($this->headerBuffer, function() use ($self, $string, $replace, $http_response_code) {
            if (headers_sent() === false) {
                header($string, $replace, $http_response_code);
            }
        });
    }

    public function code($code) {
        if($this->endset) return;

        $this->http_response_code = $code;
    }

    public function sendOnlyHeaders() {
        if($this->endset) return;

        $self = $this;
        array_push($this->headerBuffer, function() use ($self) {
            exit();
        });
    }

    public function end() {
        if($this->endset) return;

        $this->endset = true;
        $self = $this;
        array_push($this->outputBuffer, function() use ($self) {
            $self->endResponse();
        });
    }
}
