<?php

namespace vhs\observability;

use OpenTelemetry\API\Trace\Propagation\TraceContextPropagator;
use OpenTelemetry\SDK\Common\Attribute\Attributes;
use OpenTelemetry\SDK\Common\Log\LoggerHolder;
use OpenTelemetry\SDK\Resource\ResourceInfo;
use OpenTelemetry\SDK\Resource\ResourceInfoFactory;
use OpenTelemetry\SDK\Sdk;
use OpenTelemetry\SDK\Trace\ExporterFactory;
use OpenTelemetry\SDK\Trace\SamplerFactory;
use OpenTelemetry\SDK\Trace\SpanProcessorFactory;
use OpenTelemetry\SDK\Trace\TracerProvider;
use OpenTelemetry\SemConv\ResourceAttributes;
use vhs\Logger;

/**
 * OpenTelemetry SDK implementation for Nomos: owns the configuration of
 * sampling, exporting, etc, for OpenTelemetry.
 *
 * The SDK is distinct from the OpenTelemetry API, which is intended to be used
 * for instrumentation in library code: the SDK determines what to *do* with
 * the traces, the API lets you generate them without worrying about where they
 * go.
 *
 * If a SDK instance is not present, the OpenTelemetry API calls will be
 * no-ops.
 */
final class OpenTelemetry
{
    public static function Init(Logger $logger): void
    {
        // Kinda a hack: if you are not exporting traces, disable the
        // OpenTelemetry SDK altogether, since it will otherwise default to
        // exporting to localhost:4317 over OTLP, which is a quite unreasonable
        // default.
        if (getenv('OTEL_TRACES_EXPORTER') === false) {
            putenv('OTEL_SDK_DISABLED=true');
            assert(Sdk::isDisabled());
            return;
        }

        // Send OTel logs to the provided vhs logger
        LoggerHolder::set(new PsrToVhsLoggerAdapter($logger));

        $exporter = (new ExporterFactory())->create();
        $sampler = (new SamplerFactory())->create();
        $spanProcessor = (new SpanProcessorFactory())->create($exporter);

        // A "resource" is an attribute that goes on the root span,
        // representing the environment that the service instance is running in.
        $resource = ResourceInfoFactory::merge(
            ResourceInfo::create(Attributes::create([ResourceAttributes::SERVICE_NAME => 'nomos'])),
            ResourceInfoFactory::defaultResource()
        );

        $tracerProvider = TracerProvider::builder()
            ->setSampler($sampler)
            ->addSpanProcessor($spanProcessor)
            ->setResource($resource)
            ->build();

        Sdk::builder()
            ->setTracerProvider($tracerProvider)
            ->setPropagator(TraceContextPropagator::getInstance())
            ->setAutoShutdown(true)
            ->buildAndRegisterGlobal();
    }
}
