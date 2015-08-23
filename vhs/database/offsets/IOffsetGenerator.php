<?php

namespace vhs\database\offsets;

use vhs\database\IGenerator;

interface IOffsetGenerator extends IGenerator {
    public function generateOffset(Offset $offset);
}