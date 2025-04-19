<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:28 PM.
 */

namespace vhs\database\orders;

/** @typescript */
class OrderByDescending extends OrderBy {
    /**
     * generateOrderBy.
     *
     * @param \vhs\database\orders\IOrderByGenerator $generator
     *
     * @return mixed
     */
    public function generateOrderBy(IOrderByGenerator $generator) {
        return $generator->generateDescending($this);
    }
}
