<?php

namespace vhs\database\limits;

use vhs\database\IGeneratable;
use vhs\database\IGenerator;

class Limit implements IGeneratable {
  public function __construct($limit) {
      $this->limit = $limit;
  }

  public static function Limit($limit) {
    return new Limit($limit);
  }

  public function generate(IGenerator $generator, $value = null) {
    /** @var ILimitGenerator $generator */
    return $this->generateLimit($generator);
  }

  private function generateLimit(ILimitGenerator $generator) {
    return $generator->generateLimit($this); 
  }
}