<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 2:35 PM
 */

namespace vhs\services\endpoints;


class NativeEndpoint extends Endpoint {
    public function serializeOutput($data) { return $data; }
    public function deserializeOutput($data) { return $data; }
    public function deserializeInput($data) { return $data; }
    public function serializeInput($data) { return $data; }
}