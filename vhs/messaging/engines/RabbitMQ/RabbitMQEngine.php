<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:27 PM
 */

namespace vhs\messaging\engines\RabbitMQ;

use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use vhs\loggers\SilentLogger;
use vhs\messaging\Engine;
use vhs\Logger;
use vhs\messaging\engines\RabbitMQ\RabbitMQConnectionInfo;

class RabbitMQEngine extends Engine
{
    private $info;
    /** @var AMQPChannel[] */
    private $channels;
    private $logger;

    /** @var AMQPStreamConnection */
    private $connection;


    public function __construct(RabbitMQConnectionInfo $connectionInfo)
    {
        $this->info = $connectionInfo;

        $this->logger = new SilentLogger();

    }

    public function setLogger(Logger $logger)
    {
        $this->logger = $logger;
    }

    public function connect()
    {
        $this->channels = array();

        if (!is_null($this->connection))
            $this->disconnect();

        $this->connection = new AMQPStreamConnection(
            $this->info->getHost(),
            $this->info->getPort(),
            $this->info->getUsername(),
            $this->info->getPassword(),
            $this->info->getVHost()
        );
    }

    public function disconnect()
    {
        if (!is_null($this->channels)) {
            /** @var AMQPChannel $channel */
            foreach ($this->channels as $channel)
                $channel->close();
        }

        if (!is_null($this->connection))
            $this->connection->close();

        unset($this->channels);
        unset($this->connection);
    }

    public function publish($channel, $queue, $message)
    {
        $ch = $this->getChannel($channel);

        $ch->queue_declare($channel.".".$queue, false, false, false, false);

        return $ch->basic_publish(new AMQPMessage($message), '', $channel.".".$queue);
    }

    public function consume($channel, $queue, callable $callback)
    {
        $ch = $this->getChannel($channel);

        $ch->queue_declare($channel.".".$queue, false, false, false, false);

        return $ch->basic_consume($channel.".".$queue, function($msg) use ($callback) {
            $callback($msg->body);
        });
    }

    public function hasCallbacks($channel)
    {
        $ch = $this->getChannel($channel);

        return count($ch->callbacks);
    }

    public function wait($channel)
    {
        $ch = $this->getChannel($channel);

        return $ch->wait();
    }

    /**
     * @param $channel string
     * @return AMQPChannel
     */
    private function getChannel($channel) {
        if (array_key_exists($channel, $this->channels)) {
            return $this->channels[$channel];
        }

        $ch = $this->connection->channel();

        $this->channels[$channel] = $ch;

        return $ch;
    }
}