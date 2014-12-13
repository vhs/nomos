<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:07 PM
 */

namespace vhs\domain;

use vhs\database\Database;
use vhs\database\Where;
use vhs\domain\exceptions\DomainException;
use vhs\domain\exceptions\InvalidColumnDefinitionException;
use vhs\domain\validations\ValidationException;
use vhs\domain\validations\ValidationResults;

interface IDomain {
    /**
     * @return string
     */
    static function getPrimaryKeyColumn();

    /**
     * @return string
     */
    static function getTable();

    /**
     * @return string
     */
    static function getColumns();
}

abstract class Domain implements IDomain {
    private $pkValue = null;
    private $cache = array();

    protected $incomplete_column_definition = false;

    function __construct() {

    }

    protected function getColumnPropertyMap() {
        $class = get_called_class();

        $map = array();

        $pkcolumn = $class::getPrimaryKeyColumn();
        $columns = $class::getColumns();

        if(in_array($pkcolumn, $columns))
            throw new InvalidColumnDefinitionException("Primary Key column must not be also defined in Columns on '{$class}'");

        foreach ($columns as $column) {
            if (property_exists($class, $column))
                $map[$column] = $column;
            else if (!$this->incomplete_column_definition)
                throw new InvalidColumnDefinitionException("Column '{$column}' is missing property definition on '{$class}'");
        }
        return $map;
    }

    protected function getPrimaryKeyValue() {
        return $this->pkValue;
    }

    protected function setPrimaryKeyValue($value) {
        $this->pkValue = $value;
    }

    /**
     * @return object
     */
    public function getId() {
        return $this->getPrimaryKeyValue();
    }

    protected function getValues() {
        $map = $this->getColumnPropertyMap();

        $data = array();

        foreach ($map as $column => $property) {
            $data[$column] = $this->$property;
        }

        return $data;
    }

    protected function setValues($data) {
        $map = $this->getColumnPropertyMap();
        $class = get_called_class();
        $pkcolumn = $class::getPrimaryKeyColumn();

        unset($this->cache);
        $this->cache = array();

        foreach ($data as $column => $value) {
            if ($column === $pkcolumn) {
                $this->setPrimaryKeyValue($value);
            } else {
                if (isset($map[$column])) {
                    $this->$map[$column] = $value;
                    $this->cache[$column] = $value;
                } else if (!$this->incomplete_column_definition)
                    throw new InvalidColumnDefinitionException("Column '{$column}' is missing property definition on '" . get_called_class() . "'");
            }
        }
    }

    private function checkIsDirty() {
        $data = $this->getValues();

        $diff = array_diff($data, $this->cache);

        return sizeof($diff) > 0;
    }

    private function checkIsNew() {
        return is_null($this->pkValue);
    }

    private function doInsert() {
        $class = get_called_class();

        $this->setPrimaryKeyValue(
            Database::create(
                $class::getTable(),
                $this->getValues()
            )
        );
    }

    private function doUpdate() {
        $class = get_called_class();

        Database::update(
            $class::getTable(),
            $this->getValues(),
            Where::Equal($class::getPrimaryKeyColumn(), $this->getPrimaryKeyValue())
        );
    }

    protected function hydrate($primaryKeyValue = null) {
        if (is_null($primaryKeyValue)) {
            if (is_null($this->getPrimaryKeyValue()))
                throw new \Exception("Attempt to hydrate without a PK!");
            else $primaryKeyValue = $this->getPrimaryKeyValue();
        }

        $this->setPrimaryKeyValue($primaryKeyValue);

        $class = get_called_class();

        $record = Database::select(
            $class::getTable(),
            $class::getColumns(),
            Where::Equal($class::getPrimaryKeyColumn(), $this->getPrimaryKeyValue())
        );

        if(sizeof($record) <> 1) {
            if (sizeof($record) == 0) return false;
            else
                throw new DomainException("Primary Key based hydrate on {".get_called_class()."} returns more than one record.");
        }

        $this->setValues($record[0]);

        return true;
    }

    protected static function hydrateMany(Where $where = null) {
        $class = get_called_class();

        $records = Database::select(
            $class::getTable(),
            $class::getColumns(),
            $where
        );

        $items = array();
        foreach($records as $row) {
            $obj = new $class();
            $obj->setValues($row);
            array_push($items, $obj);
        }

        return $items;
    }

    private static function arbitraryHydrate($sql) {
        $class = get_called_class();

        $records =  Database::arbitrary($sql);

        $items = array();
        foreach($records as $row) {
            $obj = new $class();
            $obj->setValues($row);
            array_push($items, $obj);
        }

        return $items;
    }

    /**
     * @param $primaryKeyValue
     * @return object
     */
    public static function find($primaryKeyValue) {
        $class = get_called_class();

        $obj = new $class();

        if(!$obj->hydrate($primaryKeyValue))
            return null;

        return $obj;
    }

    /**
     * @return array
     */
    public static function findAll() {
        return self::hydrateMany();
    }

    /**
     * @param $where
     * @return array
     */
    public static function where(Where $where) {
        return self::hydrateMany($where);
    }

    protected static function arbitraryFind($sql) {
        return self::arbitraryHydrate($sql);
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    abstract public function validate(ValidationResults &$results);

    /**
     * @param null $validationResults
     * @return bool
     * @throws DomainException
     * @throws ValidationException
     * @throws \Exception
     */
    public function save(&$validationResults = null) {
        if(is_null($validationResults))
            $vr = new ValidationResults();
        else
            $vr = $validationResults;

        $this->validate($vr);

        if (!$vr->isSuccess()) {
            if(isset($validationResults)) {
                $validationResults = $vr;
                return false;
            } else throw new ValidationException($vr);
        }

        if(!$this->checkIsDirty()) return true;

        if($this->checkIsNew()) {
            $this->doInsert();
        } else {
            $this->doUpdate();
        }

        $this->hydrate();

        return true;
    }

    /**
     *
     */
    public function delete() {
        $class = get_called_class();

        Database::delete(
            $class::getTable(),
            Where::Equal($class::getPrimaryKeyColumn(), $this->getPrimaryKeyValue())
        );

        $this->setPrimaryKeyValue(null);
    }
}
