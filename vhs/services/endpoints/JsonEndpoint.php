<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 3:03 PM.
 */

namespace vhs\services\endpoints;

class JsonEndpoint extends Endpoint {
    public function deserializeInput($data) {
        return json_decode($data);
    }

    public function deserializeOutput($data) {
        return json_decode($data);
    }

    public function serializeInput($data) {
        return json_encode($data);
    }

    public function serializeOutput($data) {
        return json_encode($data);
    }
}
