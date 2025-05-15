<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:40 PM.
 */

namespace vhs\database\types;

use vhs\database\exceptions\InvalidSchemaException;

/** @typescript */
class TypeEnum extends Type {
    /** @var string[] */
    public array $values;

    /**
     * @param string ...$values
     *
     * @throws \vhs\database\exceptions\InvalidSchemaException
     */
    public function __construct(string ...$values) {
        if (gettype($values) !== 'array' || empty($values)) {
            throw new InvalidSchemaException('Enums must have at least one value');
        }

        parent::__construct(false, $values[0]); //default value for Enums will also be the first value

        $this->values = array_values($values);
    }

    public function convertType(ITypeConverter $converter, $value = null) {
        return $converter->convertEnum($this, $value);
    }

    public function generateType(ITypeGenerator $generator, $value = null) {
        return $generator->generateEnum($this, $value);
    }
}
