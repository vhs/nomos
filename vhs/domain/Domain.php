<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:07 PM
 */

namespace vhs\domain;

use vhs\database\Database;
use vhs\database\orders\OrderBy;
use vhs\database\wheres\Where;
use vhs\domain\exceptions\DomainException;
use vhs\domain\validations\ValidationException;
use vhs\domain\validations\ValidationResults;

interface IDomain {
    /**
     * @return Schema
     */
    static public function getSchema();
}

abstract class Domain implements IDomain {
    private $__cache;

    /**
     * @return Schema
     */
    private static function schema() {
        /** @var IDomain $class */
        $class = get_called_class();
        return $class::getSchema();
    }

    public function __construct() {
        $schema = self::schema();

        if(is_null($schema))
            throw new DomainException("Domain requires schema definition.");

        $keys = array();
        foreach($schema->Columns()->all() as $col)
            array_push($keys, $col->getAbsoluteName());

        $this->__cache = new DomainValueCache($keys);
    }

    public function __get($name) {
        if(self::schema()->Columns()->contains($name)) {
            $col = self::schema()->Columns()->getByName($name);
            return $this->__cache->getValue($col->getAbsoluteName());
        }

        return null;
    }

    public function __set($name, $value) {
        if(self::schema()->Columns()->contains($name)) {
            $col = self::schema()->Columns()->getByName($name);
            $this->__cache->setValue($col->getAbsoluteName(), $value);
        }
    }

    protected function getValues($excludePrimaryKeys = false) {
        $data = array();

        $pkcols = array();
        $pks = self::schema()->PrimaryKeys();
        foreach($pks as $pk)
            array_push($pkcols, $pk->column->name);

        $isPkCol = function($name) use ($pkcols) {
            foreach($pkcols as $pkcol)
                if($name === $pkcol) return true;

            return false;
        };

        foreach(self::schema()->Columns()->all() as $col) {
            if ($excludePrimaryKeys && $isPkCol($col->name))
                continue;

            $data[$col->name] = $this->__cache->getValue($col->getAbsoluteName());
        }

        return $data;
    }

    protected function getValue($name) {
        if(self::schema()->Columns()->contains($name))
            return $this->$name;

        return null;
    }

    protected function setValues($data) {
        foreach(self::schema()->Columns()->all() as $col)
            $this->__cache->setValue($col->getAbsoluteName(), $data[$col->name], true);
    }

    private function checkIsDirty() {
        return $this->__cache->hasChanged();
    }

    private function checkIsNew() {
        $pks = self::schema()->PrimaryKeys();

        $isNew = false;
        foreach($pks as $pk)
            $isNew = $isNew || is_null($this->__get($pk->column->name));

        return $isNew;
    }

    private function pkWhere($primaryKeyValues = null) {
        $pks = self::schema()->PrimaryKeys();

        if(count($pks) <= 0)
            throw new DomainException("Schema on domain must have Primary Keys");

        $wheres = array();

        foreach ($pks as $pk) {
            $value = $this->__get($pk->column->name);

            if(!is_null($primaryKeyValues)) {
                if(is_array($primaryKeyValues))
                    $value = $primaryKeyValues[$pk->column->name];
                else
                    $value = $primaryKeyValues;
            }

            array_push($wheres, Where::Equal($pk->column, $value));
        }

        if(count($wheres) > 1)
            return Where::_And(...$wheres);
        else if (count($wheres) == 1)
            return $wheres[0];

        return null;
    }

    private function doInsert() {
        $this->hydrate(
            Database::create(
                self::schema()->Table(),
                $this->getValues(true)
            )
        );
    }

    private function doUpdate() {
        Database::update(
            self::schema()->Table(),
            $this->getValues(true),
            $this->pkWhere()
        );
    }

    protected function hydrate($pk = null) {
        $record = Database::select(
            self::schema()->Table(),
            self::schema()->Columns(),
            $this->pkWhere($pk)
        );

        if(sizeof($record) <> 1) {
            if (sizeof($record) == 0) return false;
            else
                throw new DomainException("Primary Key based hydrate on {".get_called_class()."} returns more than one record.");
        }

        $this->setValues($record[0]);

        return true;
    }

    protected static function hydrateMany(Where $where = null, OrderBy $orderBy = null, $limit = null) {
        $class = get_called_class();

        $records = Database::select(
            self::schema()->Table(),
            self::schema()->Columns(),
            $where,
            $orderBy,
            $limit
        );

        $items = array();
        foreach($records as $row) {
            /** @var Domain $obj */
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
            /** @var Domain $obj */
            $obj = new $class();
            $obj->setValues($row);
            array_push($items, $obj);
        }

        return $items;
    }

    /**
     * @param array $primaryKeyValues
     * @return object
     */
    public static function find($primaryKeyValues) {
        $class = get_called_class();

        /** @var Domain $obj */
        $obj = new $class();

        if(!$obj->hydrate($primaryKeyValues))
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
     * @param Where $where
     * @param OrderBy $orderBy
     * @param null $limit
     * @return array
     */
    public static function where(Where $where, OrderBy $orderBy = null, $limit = null) {
        return self::hydrateMany($where, $orderBy, $limit);
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

    public function delete() {
        Database::delete(
            self::schema()->Table(),
            $this->pkWhere()
        );

        $pks = self::schema()->PrimaryKeys();
        foreach($pks as $pk)
            $this->__set($pk->column->name, null);
    }
}
