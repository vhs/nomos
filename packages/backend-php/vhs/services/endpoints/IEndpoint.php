<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 3:46 PM.
 */

namespace vhs\services\endpoints;

/** @typescript */
interface IEndpoint {
    /**
     * deserializeInput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function deserializeInput($data);

    /**
     * deserializeOutput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function deserializeOutput($data);

    /**
     * serializeInput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function serializeInput($data);

    /**
     * serializeOutput.
     *
     * @param mixed $data
     *
     * @return mixed
     */
    public function serializeOutput($data);
}
