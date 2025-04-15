<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:50 PM.
 */

namespace vhs\database\wheres;

use vhs\database\IGenerator;

/** @typescript */
interface IWhereGenerator extends IGenerator {
    /**
     * generateAnd.
     *
     * @param \vhs\database\wheres\WhereAnd $where
     *
     * @return callable
     */
    public function generateAnd(WhereAnd $where);

    /**
     * generateComparator.
     *
     * @param \vhs\database\wheres\WhereComparator $where
     *
     * @return callable
     */
    public function generateComparator(WhereComparator $where);

    /**
     * generateOr.
     *
     * @param \vhs\database\wheres\WhereOr $where
     *
     * @return callable
     */
    public function generateOr(WhereOr $where);
}
