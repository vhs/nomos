<?php

namespace app\utils;

class EnumMapper {
    /**
     * tryFrom.
     *
     * @param object{name:string}[] $cases
     * @param string                $needle
     *
     * @return mixed
     */
    public static function tryFrom($cases, $needle) {
        $vals = array_map(fn($e): string => $e->name, array_values($cases));

        if (in_array($needle, $vals)) {
            return array_search($needle, $cases);
        }

        return null;
    }
}
