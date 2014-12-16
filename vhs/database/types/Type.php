<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:25 PM
 */

namespace vhs\database\types;


use vhs\database\exceptions\InvalidSchemaException;
use vhs\database\IGeneratable;
use vhs\database\IGenerator;

abstract class Type implements IGeneratable {

    public $nullable;
    public $default;

    public function __construct($nullable = true, $default = null) {
        if(!$nullable && is_null($default))
            throw new InvalidSchemaException("Default value must be specified if type is not nullable");

        $this->nullable = $nullable;
        $this->default = $default;
    }

    public static function Bool($nullable = true, $default = null) {
        return new TypeBool($nullable, $default);
    }

    public static function Int($nullable = true, $default = null) {
        return new TypeInt($nullable, $default);
    }

    public static function Float($nullable = true, $default = null) {
        return new TypeFloat($nullable, $default);
    }

    public static function String($nullable = true, $default = null, $length = 255) {
        return new TypeString($nullable, $default, $length);
    }

    public static function Text($nullable = true, $default = null) {
        return new TypeText($nullable, $default);
    }

    public static function Date($nullable = true, $default = null) {
        return new TypeDate($nullable, $default);
    }

    public static function DateTime($nullable = true, $default = null) {
        return new TypeDateTime($nullable, $default);
    }

    public static function Enum(...$values) {
        return new TypeEnum($values);
    }

    /**
     * @param IGenerator $generator
     * @return mixed
     */
    public function generate(IGenerator $generator) {
        /** @var TypeGenerator $generator */
        return $this->generateType($generator);
    }

    abstract public function generateType(TypeGenerator $generator);
}
