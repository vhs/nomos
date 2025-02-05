<?php

namespace vhs\database\limits;

use vhs\database\IGenerator;

/** @typescript */
interface ILimitGenerator extends IGenerator {
    public function generateLimit(Limit $limit);
}
