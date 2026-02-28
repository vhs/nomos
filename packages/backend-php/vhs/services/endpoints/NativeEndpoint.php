<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 2:35 PM.
 */

namespace vhs\services\endpoints;

/** @typescript */
class NativeEndpoint extends Endpoint {
    /**
     * deserializeInput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function deserializeInput($data) {
        return $data;
    }

    /**
     * deserializeOutput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function deserializeOutput($data) {
        return $data;
    }

    /**
     * serializeInput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function serializeInput($data) {
        return $data;
    }

    /**
     * serializeOutput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function serializeOutput($data) {
        return $data;
    }
}
