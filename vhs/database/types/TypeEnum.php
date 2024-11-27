<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:40 PM
 */

namespace vhs\database\types;

use vhs\database\exceptions\InvalidSchemaException;

class TypeEnum extends Type {
    /**
     * @var \string[]
     */
    public $values;

    /**
     * @param \string[] ...$values
     * @throws InvalidSchemaException
     */
    public function __construct(...$values) {
        if (is_null($values) || count($values) <= 0) {
            throw new InvalidSchemaException('Enums must have at least one value');
        }

        parent::__construct(false, $values[0]); //default value for Enums will also be the first value

        $this->values = $values;
    }

    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateEnum($this, $value);
    }

    public function covertType(ITypeConverter $converter, $value = null) {
        return $converter->convertEnum($this, $value);
    }
}
