<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 1:00 PM.
 */

namespace vhs\database\joins;

use vhs\database\IGenerator;

/** @typescript */
interface IJoinGenerator extends IGenerator {
    /**
     * generateCross.
     *
     * @param \vhs\database\joins\JoinCross $join
     *
     * @return mixed
     */
    public function generateCross(JoinCross $join);

    /**
     * generateInner.
     *
     * @param \vhs\database\joins\JoinInner $join
     *
     * @return mixed
     */
    public function generateInner(JoinInner $join);

    /**
     * generateLeft.
     *
     * @param \vhs\database\joins\JoinLeft $join
     *
     * @return mixed
     */
    public function generateLeft(JoinLeft $join);

    /**
     * generateOuter.
     *
     * @param \vhs\database\joins\JoinOuter $join
     *
     * @return mixed
     */
    public function generateOuter(JoinOuter $join);

    /**
     * generateRight.
     *
     * @param \vhs\database\joins\JoinRight $join
     *
     * @return mixed
     */
    public function generateRight(JoinRight $join);
}
