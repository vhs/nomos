<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 11:49 AM
 */

namespace vhs\web;


use OpenTelemetry\API\Common\Instrumentation\CachedInstrumentation;
use OpenTelemetry\API\Trace\SpanInterface;
use OpenTelemetry\API\Trace\SpanKind;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\Context\ScopeInterface;
use OpenTelemetry\SemConv\TraceAttributes;
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

    private ?SpanInterface $root_span = null;
    private ?ScopeInterface $root_scope = null;

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

    /**
     * Starts the root span for a request, which will appear as one individual
     * trace in OpenTelemetry.
     */
    private function beginRootSpan(): void {
        // NOTE: OpenTelemetry root spans cannot be implemented as a module
        // since it needs to create the root span *before* starting other
        // modules, and end it *after* all the other modules complete.
        $tracer = (new CachedInstrumentation('vhs\\web\\HttpServer'))->tracer();
        $this->root_span = $tracer
            ->spanBuilder($this->request->url)
            ->setSpanKind(SpanKind::KIND_SERVER)
            ->setAttribute(TraceAttributes::HTTP_METHOD, $this->request->method)
            ->startSpan();
        $this->root_scope = $this->root_span->activate();
    }

    /**
     * Ends the root span for a request. Expected to be called unconditionally
     * at the end of a request's lifecycle (if not, the trace will most likely
     * be shown as missing a root span).
     *
     * Called by the RequestFinished exception handler.
     */
    public function endRootSpan(): void {
        if ($this->root_span) {
            $this->root_span->end();
        }
        if ($this->root_scope) {
            $this->root_scope->detach();
        }
    }

    public function handle() {
        $this->handling = true;
        $this->clear();

        $this->request = HttpUtil::getCurrentRequest();

        session_start();

        $this->beginRootSpan();

        $exception = null;
        /** @var IHttpModule $module */
        $index = 0;
        foreach($this->modules as $module) {
            if($this->endset) break;

            try {
                $module->handle($this);
            } catch(\Exception $ex) {
                $exception = $ex;
                $this->root_span->recordException($ex);
                $this->root_span->setStatus(StatusCode::STATUS_ERROR);
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
                $this->root_span->recordException($ex);
                $this->root_span->setStatus(StatusCode::STATUS_ERROR);
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

        throw new \vhs\RequestFinished();
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
            throw new \vhs\RequestFinished();
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
