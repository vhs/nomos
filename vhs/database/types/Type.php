<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:25 PM
 */

namespace vhs\database\types;


use vhs\database\exceptions\InvalidSchemaException;
use vhs\database\IConvertible;
use vhs\database\IConverter;
use vhs\database\IGeneratable;
use vhs\database\IGenerator;

abstract class Type implements IGeneratable, IConvertible {

    public $nullable;
    public $default;
    public $value;

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
     * @param mixed $value
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var ITypeGenerator $generator */
        return $this->generateType($generator, $value);
    }

    abstract public function generateType(ITypeGenerator $generator, $value = null);

    /**
     * @param IConverter $converter
     * @param mixed $value
     * @return mixed
     */
    public function convert(IConverter $converter, $value = null) {
        /** @var ITypeConverter $converter */
        return $this->covertType($converter, $value);
    }

    abstract public function covertType(ITypeConverter $converter, $value = null);
}
