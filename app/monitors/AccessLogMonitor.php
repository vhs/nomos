<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:17 PM
 */

namespace app\monitors;


use app\domain\AccessLog;
use app\domain\User;
use Aws\Sns\MessageValidator\Message;
use vhs\Logger;
use vhs\messaging\MessageQueue;
use vhs\monitors\Monitor;

class AccessLogMonitor extends Monitor
{

    public function Init(Logger &$logger = null)
    {
        AccessLog::onAnyCreated([$this, "accessed"]);
    }

    public function accessed($args) {
        //$entry = AccessLog::find($args[0]->id);

        $retval = array();

        $retval["type"] = $args[0]->type;
        $retval["authorized"] = $args[0]->authorized;
        $retval["time"] = $args[0]->time;
        $retval["username"] = "unknown";

        if (!is_null($args[0]->userid)) {
            $user = User::find($args[0]->userid);

            $retval["username"] = $user->username;
        }

        MessageQueue::publish("accessLog", "created", json_encode($retval));
    }
}