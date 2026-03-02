<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 3:03 PM.
 */

namespace vhs\services\endpoints;

/** @typescript */
class JsonEndpoint extends Endpoint {
    /**
     * deserializeInput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function deserializeInput($data) {
        return json_decode($data);
    }

    /**
     * deserializeOutput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function deserializeOutput($data) {
        return json_decode($data);
    }

    /**
     * serializeInput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function serializeInput($data) {
        return json_encode($data);
    }

    /**
     * serializeOutput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function serializeOutput($data) {
        return json_encode($data);
    }
}
