<?php

namespace vhs\database\limits;

use vhs\database\Element;
use vhs\database\IGeneratable;
use vhs\database\IGenerator;

/** @typescript */
class Limit extends Element implements IGeneratable {
    /** @var int|null $limit */
    public $limit;

    /**
     * constructor.
     *
     * @param int $limit
     */
    public function __construct($limit) {
        $this->limit = $limit;
    }

    /**
     * Static Limit instantiator.
     *
     * @param int|null $limit
     *
     * @return Limit
     */
    public static function Limit($limit) {
        return new Limit($limit);
    }

    /**
     * generate.
     *
     * @param ILimitGenerator $generator
     * @param mixed           $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        return $this->generateLimit($generator);
    }

    /**
     * generateLimit.
     *
     * @param \vhs\database\limits\ILimitGenerator $generator
     *
     * @return mixed
     */
    private function generateLimit(ILimitGenerator $generator) {
        return $generator->generateLimit($this);
    }
}
