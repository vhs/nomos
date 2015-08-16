<?php

namespace vhs\database\offsets;

use vhs\database\IGeneratable;
use vhs\database\IGenerator;

class Offset implements IGeneratable {
  public function __construct($offset) {
      $this->offset = $offset;
  }

  public static function Offset($offset) {
    return new Offset($offset);
  }

  public function generate(IGenerator $generator) {
    /** @var ILimitGenerator $generator */
    return $generator->generateOffset($this); 
    //return $this->generateLimit($generator);
  }

  private function generateOffset(IOffsetGenerator $generator) {
    return $generator->generateOffset($this); 
  }
}