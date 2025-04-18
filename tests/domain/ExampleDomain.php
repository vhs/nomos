<?php

namespace tests\domain;

use tests\schema\ExampleSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationFailure;
use vhs\domain\validations\ValidationResults;

/**
 * @property int                         $id
 * @property string|\vhs\database\Column $testA
 * @property string|\vhs\database\Column $testB
 * @property string|\vhs\database\Column $testC
 * @property string                      $internal_testC
 * @property string                      $magic
 *
 * @typescript
 */
class ExampleDomain extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define() {
        ExampleDomain::Schema(ExampleSchema::Type());
    }

    /**
     * get_magic.
     *
     * @return string
     */
    public function get_magic(): string {
        return 'magic field';
    }

    /**
     * get_testC.
     *
     * @return string
     */
    public function get_testC(): string {
        return $this->internal_testC . 'fail';
    }

    /**
     * set_magic.
     *
     * @param mixed $value
     *
     * @return void
     */
    public function set_magic($value) {
        $this->testC = $value . 'magic';
    }

    /**
     * set_testC.
     *
     * @param mixed $value
     *
     * @return void
     */
    public function set_testC($value) {
        $this->internal_testC = $value . 'pass';
    }

    /**
     * validate.
     *
     * @param \vhs\domain\validations\ValidationResults $results
     *
     * @return void
     */
    public function validate(ValidationResults &$results) {
        if ($this->testA != 'pass') {
            $results->add(new ValidationFailure('testA is not equal to pass'));
        }
    }
}
