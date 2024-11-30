<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 2:58 PM.
 */

namespace app\resources;

use vhs\Singleton;

class Resource extends Singleton {
    private $data;

    protected function __construct() {
        $this->data = [];

        //$this->data[] =
    }

    public function __get($name) {
        if (array_key_exists($name, $this->data)) {
            return $this->data[$name];
        }

        return 'MissingResource.' . $name;
    }
}
