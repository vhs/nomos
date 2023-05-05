<?php

namespace vhs\web\modules;

use DateInterval;
use DateTimeImmutable;
use Exception;
use OpenTelemetry\SDK\Trace\Span;
use vhs\web\HttpServer;
use vhs\web\IHttpModule;

/**
 * Adds a link to the request's trace in a header, so you can click it and pull
 * the trace for the request.
 */
class HttpTraceLinkModule implements IHttpModule
{
    private static function getTraceId(): ?string
    {
        $currContext = Span::getCurrent()->getContext();
        // If the trace is not sampled, it's *definitely* not going to be
        // sent out, so don't provide a trace id.
        if ($currContext->isSampled()) {
            return $currContext->getTraceId();
        } else {
            return null;
        }
    }

    private static function makeTraceLink(string $template, string $traceId, int $startTs): string
    {
        return str_replace(['%TRACE_ID%', '%TRACE_START_TS%'], [$traceId, (string)$startTs], $template);
    }

    private static function generateTraceLink(): string
    {
        $traceId = self::getTraceId();
        if (is_null($traceId)) {
            return '(not sampled)';
        }

        // It is Non-obvious(tm) how to get the concrete instance of the root
        // Span to find the actual value, so just use the current time minus a
        // minute. This retains the property of links containing approximately
        // the time range to look around.
        $startTs = (new DateTimeImmutable())->sub(DateInterval::createFromDateString('1 minute'))->getTimestamp();
        return self::makeTraceLink(TRACE_URL_FORMAT, $traceId, $startTs);
    }

    public function handle(HttpServer $server): void
    {
        $link = self::generateTraceLink();
        $server->header("vhs-trace-link: $link");
    }

    public function endResponse(HttpServer $server): void
    {
    }

    public function handleException(HttpServer $server, Exception $ex): void
    {
    }

}
