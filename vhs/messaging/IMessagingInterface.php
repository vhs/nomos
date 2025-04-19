<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:25 PM.
 */

namespace vhs\messaging;

/** @typescript */
interface IMessagingInterface {
    /**
     * consume.
     *
     * @param mixed    $channel
     * @param mixed    $queue
     * @param callable $callback
     *
     * @return string
     */
    public function consume($channel, $queue, callable $callback);

    /**
     * ensure.
     *
     * @param mixed $channel
     * @param mixed $queue
     *
     * @return void
     */
    public function ensure($channel, $queue);

    /**
     * hasCallbacks.
     *
     * @param mixed $channel
     *
     * @return int
     */
    public function hasCallbacks($channel);

    /**
     * publish.
     *
     * @param mixed $channel
     * @param mixed $queue
     * @param mixed $message
     *
     * @return void
     */
    public function publish($channel, $queue, $message);

    /**
     * wait.
     *
     * @param mixed $channel
     *
     * @return mixed
     */
    public function wait($channel);
}
