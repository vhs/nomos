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
    /**
     * generateQuery.
     *
     * @param \vhs\database\queries\IQueryGenerator $generator
     *
     * @return mixed
     */
    public function generateQuery(IQueryGenerator $generator) {
        return $generator->generateDelete($this);
    }
}
