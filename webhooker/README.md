# Nomos WebHook Broker

This component is a daemon that brokers the webhooks for nomos.

It dequeues events from RabbitMQ and hits the registered callbacks

AFAIK as of Nov 16, 2025, nothing depends on this infrastructure.

Up until this commit https://github.com/vhs/nomos/pull/343, the webhooker docker container was in a reboot-loop.
