<?php

namespace vhs\database\limits;

use vhs\database\IGenerator;

/** @typescript */
interface ILimitGenerator extends IGenerator {
    /**
     * generateLimit.
     *
     * @param \vhs\database\limits\Limit $limit
     *
     * @return mixed
     */
    public function generateLimit(Limit $limit);
}
