<?php

namespace vhs\database\offsets;

use vhs\database\Element;
use vhs\database\IGenerator;

class Offset extends Element {
    public function __construct($offset) {
        $this->offset = $offset;
    }

    public static function Offset($offset) {
        return new Offset($offset);
    }

    public function generate(IGenerator $generator, $value = null) {
        /** @var IOffsetGenerator $generator */
        return $this->generateOffset($generator);
    }

    private function generateOffset(IOffsetGenerator $generator) {
        return $generator->generateOffset($this);
    }
}
