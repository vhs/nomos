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
    public function deserializeInput($data);

    public function deserializeOutput($data);

    public function serializeInput($data);

    public function serializeOutput($data);
}
