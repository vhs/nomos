<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/12/2014
 * Time: 3:25 PM.
 */

namespace vhs\database\types;

use vhs\database\Element;
use vhs\database\exceptions\InvalidSchemaException;
use vhs\database\IConverter;
use vhs\database\IConvertible;
use vhs\database\IGenerator;

/** @typescript */
abstract class Type extends Element implements IConvertible {
    /**
     * default.
     *
     * @var mixed
     */
    public $default;
    /**
     * nullable.
     *
     * @var mixed
     */
    public $nullable;
    /**
     * value.
     *
     * @var mixed
     */
    public $value;

    /**
     * constructor.
     *
     * @param bool  $nullable
     * @param mixed $default
     *
     * @throws \vhs\database\exceptions\InvalidSchemaException
     *
     * @return void
     */
    public function __construct($nullable = true, $default = null) {
        if (!$nullable && is_null($default)) {
            throw new InvalidSchemaException('Default value must be specified if type is not nullable');
        }

        $this->nullable = $nullable;
        $this->default = $default;
    }

    /**
     * Bool.
     *
     * @param bool  $nullable
     * @param mixed $default
     *
     * @return TypeBool
     */
    public static function Bool($nullable = true, $default = null) {
        return new TypeBool($nullable, $default);
    }

    /**
     * Date.
     *
     * @param bool  $nullable
     * @param mixed $default
     *
     * @return TypeDate
     */
    public static function Date($nullable = true, $default = null) {
        return new TypeDate($nullable, $default);
    }

    /**
     * DateTime.
     *
     * @param bool  $nullable
     * @param mixed $default
     *
     * @return TypeDateTime
     */
    public static function DateTime($nullable = true, $default = null) {
        return new TypeDateTime($nullable, $default);
    }

    /**
     * Enum.
     *
     * @param mixed $values
     *
     * @return TypeEnum
     */
    public static function Enum(...$values) {
        return new TypeEnum(...$values);
    }

    /**
     * Float.
     *
     * @param bool  $nullable
     * @param mixed $default
     *
     * @return TypeFloat
     */
    public static function Float($nullable = true, $default = null) {
        return new TypeFloat($nullable, $default);
    }

    /**
     * Int.
     *
     * @param bool  $nullable
     * @param mixed $default
     *
     * @return TypeInt
     */
    public static function Int($nullable = true, $default = null) {
        return new TypeInt($nullable, $default);
    }

    /**
     * String.
     *
     * @param bool  $nullable
     * @param mixed $default
     * @param int   $length
     *
     * @return TypeString
     */
    public static function String($nullable = true, $default = null, $length = 255) {
        return new TypeString($nullable, $default, $length);
    }

    /**
     * Text.
     *
     * @param bool  $nullable
     * @param mixed $default
     *
     * @return TypeText
     */
    public static function Text($nullable = true, $default = null) {
        return new TypeText($nullable, $default);
    }

    /**
     * convertType.
     *
     * @param ITypeConverter $converter
     * @param mixed          $value
     *
     * @return mixed
     */
    abstract public function convertType(ITypeConverter $converter, $value = null);

    /**
     * generateType.
     *
     * @param ITypeGenerator $generator
     * @param mixed          $value
     *
     * @return mixed
     */
    abstract public function generateType(ITypeGenerator $generator, $value = null);

    /**
     * @param IConverter $converter
     * @param mixed      $value
     *
     * @return mixed
     */
    public function convert(IConverter $converter, $value = null) {
        /** @var ITypeConverter $converter */
        return $this->convertType($converter, $value);
    }

    /**
     * @param IGenerator $generator
     * @param mixed      $value
     *
     * @return mixed
     */
    public function generate(IGenerator $generator, $value = null) {
        /** @var ITypeGenerator $generator */
        return $this->generateType($generator, $value);
    }
}
