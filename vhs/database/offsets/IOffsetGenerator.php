<?php

namespace vhs\database\offsets;

use vhs\database\IGenerator;

/** @typescript */
interface IOffsetGenerator extends IGenerator {
    public function generateOffset(Offset $offset);
}
