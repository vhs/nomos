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
    public function __construct(array $data) {
        if (empty($data) || count($data) === 0) {
            throw new Exception('Missing DTO construction argument!');
        }

        foreach ($data as $k => $v) {
            $this->{$k} = $v;
        }
    }
}
