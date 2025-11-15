<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:27 PM.
 */

namespace vhs\messaging\engines\RabbitMQ;

use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use vhs\Logger;
use vhs\loggers\SilentLogger;
use vhs\messaging\Engine;

/** @typescript */
class RabbitMQEngine extends Engine {
    /** @var AMQPChannel[] */
    private $channels;

    /** @var AMQPStreamConnection */
    private $connection;

    /**
     * info.
     *
     * @var \vhs\messaging\engines\RabbitMQ\RabbitMQConnectionInfo
     */
    private $info;

    /**
     * logger.
     *
     * @var \vhs\Logger
     *
     * @phpstan-ignore property.onlyWritten
     */
    private $logger;

    /**
     * __construct.
     *
     * @param \vhs\messaging\engines\RabbitMQ\RabbitMQConnectionInfo $connectionInfo
     *
     * @return void
     */
    public function __construct(RabbitMQConnectionInfo $connectionInfo) {
        $this->info = $connectionInfo;

        $this->logger = new SilentLogger();
    }

    /**
     * connect.
     *
     * @return void
     */
    public function connect() {
        if (!is_null($this->connection)) {
            if ($this->connection->isConnected()) {
                return;
            } else {
                $this->disconnect();
            }
        }

        $this->channels = [];

        $this->connection = new AMQPStreamConnection(
            $this->info->getHost(),
            $this->info->getPort(),
            $this->info->getUsername(),
            $this->info->getPassword(),
            $this->info->getVHost()
        );
    }

    /**
     * disconnect.
     *
     * @return void
     */
    public function disconnect() {
        if (!is_null($this->channels)) {
            /** @var AMQPChannel $channel */
            foreach ($this->channels as $channel) {
                $channel->close();
            }
        }

        if (!is_null($this->connection)) {
            $this->connection->close();
        }

        unset($this->channels, $this->connection);
    }

    /**
     * consume.
     *
     * @param mixed    $channel
     * @param mixed    $queue
     * @param callable $callback
     *
     * @return string
     */
    public function consume($channel, $queue, callable $callback) {
        $ch = $this->getChannel($channel);

        $ch->queue_declare($channel . '.' . $queue, false, false, false, false);

        return $ch->basic_consume($channel . '.' . $queue, \uniqid(), false, false, false, false, function ($msg) use ($callback) {
            $callback($msg->body);
        });
    }

    /**
     * ensure.
     *
     * @param mixed $channel
     * @param mixed $queue
     *
     * @return void
     */
    public function ensure($channel, $queue) {
        $ch = $this->getChannel($channel);

        $ch->queue_declare($channel . '.' . $queue, false, false, false, false);
    }

    /**
     * hasCallbacks.
     *
     * @param mixed $channel
     *
     * @return int
     */
    public function hasCallbacks($channel) {
        $ch = $this->getChannel($channel);

        return count($ch->callbacks);
    }

    /**
     * publish.
     *
     * @param mixed $channel
     * @param mixed $queue
     * @param mixed $message
     *
     * @return void
     */
    public function publish($channel, $queue, $message) {
        $ch = $this->getChannel($channel);

        $ch->queue_declare($channel . '.' . $queue, false, false, false, false);

        $ch->basic_publish(new AMQPMessage($message), '', $channel . '.' . $queue);
    }

    /**
     * setLogger.
     *
     * @param \vhs\Logger $logger
     *
     * @return void
     */
    public function setLogger(Logger $logger) {
        $this->logger = $logger;
    }

    /**
     * wait.
     *
     * @param mixed $channel
     *
     * @return mixed
     */
    public function wait($channel) {
        $ch = $this->getChannel($channel);

        return $ch->wait();
    }

    /**
     * @param string $channel
     *
     * @return AMQPChannel
     */
    private function getChannel($channel) {
        /*
        if (array_key_exists($channel, $this->channels)) {
            return $this->channels[$channel];
        }

        $ch = $this->connection->channel();

        $this->channels[$channel] = $ch;

        return $ch;
        */
        return $this->connection->channel();
    }
}
