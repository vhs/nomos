<?php

namespace vhs\database\offsets;

use vhs\database\IGenerator;

/**
 * @typescript
 */
interface IOffsetGenerator extends IGenerator {
    /**
     * generateOffset.
     *
     * @param \vhs\database\offsets\Offset $offset
     *
     * @return mixed
     */
    public function generateOffset(Offset $offset);
}
