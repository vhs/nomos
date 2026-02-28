<?php

namespace vhs\domain;

/** @typescript */
interface ISchema {
    /**
     * init.
     *
     * @return \vhs\database\Table
     */
    public static function init();
}
