<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 11:26 PM.
 */

namespace vhs\database\orders;

use vhs\database\IGenerator;

/** @typescript */
interface IOrderByGenerator extends IGenerator {
    /**
     * generateAscending.
     *
     * @param \vhs\database\orders\OrderByAscending $ascending
     *
     * @return mixed
     */
    public function generateAscending(OrderByAscending $ascending);

    /**
     * generateDescending.
     *
     * @param \vhs\database\orders\OrderByDescending $descending
     *
     * @return mixed
     */
    public function generateDescending(OrderByDescending $descending);
}
