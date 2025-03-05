<?php

namespace app\utils;

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
        foreach ($data as $k => $v) {
            $this->{$k} = $v;
        }
    }
}
