<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:50 PM.
 */

namespace vhs\database\queries;

/** @typescript */
class QueryDelete extends Query {
    public function generateQuery(IQueryGenerator $generator) {
        return $generator->generateDelete($this);
    }
}
