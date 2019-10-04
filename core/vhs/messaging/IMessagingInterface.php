<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:25 PM
 */

namespace vhs\messaging;


interface IMessagingInterface
{
    public function ensure($channel, $queue);
    public function publish($channel, $queue, $message);
    public function consume($channel, $queue, callable $callback);
    public function hasCallbacks($channel);
    public function wait($channel);
}
