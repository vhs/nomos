<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 2:58 PM.
 */

namespace app\resources;

use vhs\Singleton;

/** @typescript */
class Resource extends Singleton {
    /** @var array<string,mixed> */
    private $data;

    protected function __construct() {
        $this->data = [];

        //$this->data[] =
    }

    /**
     * __get.
     *
     * @param string $name
     *
     * @return mixed
     */
    public function __get($name) {
        if (array_key_exists($name, $this->data)) {
            return $this->data[$name];
        }

        return 'MissingResource.' . $name;
    }
}
