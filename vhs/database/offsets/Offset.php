<?php

namespace vhs\database\offsets;

use vhs\database\Element;
use vhs\database\IGenerator;

/** @typescript */
class Offset extends Element {
    /**
     * offset.
     *
     * @var mixed
     */
    public $offset;

    /**
     * __construct.
     *
     * @param mixed $offset
     *
     * @return void
     */
    public function __construct($offset) {
        $this->offset = $offset;
    }

    /**
     * Offset.
     *
     * @param mixed $offset
     *
     * @return \vhs\database\offsets\Offset
     */
    public static function Offset($offset) {
        return new Offset($offset);
    }

    /**
     * generate.
     *
     * @param \vhs\database\IGenerator $generator
     * @param mixed                    $value
     *
     * @return mixed
     */
    public function generate($generator, $value = null) {
        /** @var \vhs\database\offsets\IOffsetGenerator $generator */
        return $this->generateOffset($generator);
    }

    /**
     * generateOffset.
     *
     * @param \vhs\database\offsets\IOffsetGenerator $generator
     *
     * @return mixed
     */
    private function generateOffset($generator) {
        return $generator->generateOffset($this);
    }
}
