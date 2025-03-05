<?php

namespace app\utils;

/**
 * Magic Data Transfer Object base class.
 *
 * Input array is automatically assigned for easy data transfer conversion
 *
 * @param array<string,mixed> $data
 */
class DTO {
    public function __construct(array $data) {
        foreach ($data as $k => $v) {
            $this->{$k} = $v;
        }
    }
}
