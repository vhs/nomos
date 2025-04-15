<?php

namespace app\utils;

use Exception;
use stdClass;

/**
 * Magic Data Transfer Object base class.
 *
 * Input array is automatically assigned for easy data transfer conversion
 *
 * @param array<string,mixed> $data
 */
class DTO extends stdClass {
    /**
     * __construct.
     *
     * @param array<string,mixed>|object $data
     *
     * @return void
     */
    public function __construct($data) {
        if (
            (gettype($data) !== 'array' && gettype($data) !== 'object') ||
            (gettype($data) === 'array' && empty($data)) ||
            (gettype($data) === 'object' && count(get_object_vars($data)) === 0)
        ) {
            throw new Exception('Missing DTO construction argument!');
        }

        foreach ($data as $k => $v) {
            $this->{$k} = $v;
        }
    }
}
