<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 27/12/2014
 * Time: 3:46 PM
 */

namespace vhs\services\endpoints;

interface IEndpoint {
    public function serializeOutput($data);

    public function deserializeOutput($data);

    public function serializeInput($data);

    public function deserializeInput($data);
}
