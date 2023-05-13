<?php

namespace vhs\database\engines\mysql;

use OpenTelemetry\API\Trace\SpanKind;
use OpenTelemetry\API\Trace\TracerInterface;
use OpenTelemetry\API\Common\Instrumentation\CachedInstrumentation;

final class MySqlOtelWrapper extends \mysqli
{
    private static function getTracer(): TracerInterface
    {
        return (new CachedInstrumentation('vhs\\database\\engines\\mysql'))->tracer();
    }

    /**
     * @return \mysqli_result|bool
     */
    public function query($query, $resultmode = null)
    {
        // FIXME(jade): replace this whole thing with the auto instrumentation
        // extension when we upgrade to PHP 8 where that is available. Benefit:
        // caller details and it's not as much of a dirty hack.
        $span = self::getTracer()
            ->spanBuilder($query)
            ->setSpanKind(SpanKind::KIND_CLIENT)
            ->startSpan();
        $scope = $span->activate();
        try {
            return parent::query($query, $resultmode);
        } finally {
            $span->end();
            $scope->detach();
        }
    }
}
