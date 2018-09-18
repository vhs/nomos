<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:07 PM
 */

namespace vhs\domain;

use vhs\database\Column;
use vhs\database\Columns;
use vhs\database\constraints\ForeignKey;
use vhs\database\Database;
use vhs\database\limits\Limit;
use vhs\database\offsets\Offset;
use vhs\database\orders\OrderBy;
use vhs\database\orders\OrderByAscending;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\collections\ChildDomainCollection;
use vhs\domain\collections\DomainCollection;
use vhs\domain\collections\SatelliteDomainCollection;
use vhs\domain\exceptions\DomainException;
use vhs\domain\validations\ValidationException;
use vhs\domain\validations\ValidationResults;

interface IDomain {
    static function Define();
}

abstract class Domain extends Notifier implements IDomain, \Serializable, \JsonSerializable {
    private static $__definition = array();
    private $__dirtyChildren = false;
    private $__cache;
    private $__collections;
    private $__parentRelationships;
    private $__parentRelationshipsColumnMap;

    /**
     * @return string - Class name of type
     */
    public static function Type() {
        return get_called_class();
    }


    private static function ensureDefined() {
        $class = get_called_class();

        if(!array_key_exists($class, self::$__definition)) {
            self::$__definition[$class] = array();
            self::$__definition[$class]['Schema'] = null;
            self::$__definition[$class]['Relationships'] = array();
            $class::Define();
        }
    }

    public static function AccessDefinition() {
        $checks = self::Schema()->Table()->checks;

        foreach($checks as $check)
            $check->serialize();
    }

    /**
     * @param string $domain
     * @param Schema $joinTable
     * @param string $as
     */
    protected static function Relationship($as, $domain, Schema $joinTable = null) {
        self::ensureDefined();

        $class = get_called_class();

        self::$__definition[$class]['Relationships'][$as] = array();
        self::$__definition[$class]['Relationships'][$as]['Domain'] = $domain;
        self::$__definition[$class]['Relationships'][$as]['JoinTable'] = $joinTable;
    }

    protected static function Relationships() {
        self::ensureDefined();

        $class = get_called_class();

        return self::$__definition[$class]['Relationships'];
    }

    /**
     * @param Schema $schema
     * @return Schema
     */
    public static function Schema(Schema $schema = null) {
        self::ensureDefined();

        $class = get_called_class();

        if(!is_null($schema))
            self::$__definition[$class]['Schema'] = $schema;

        return self::$__definition[$class]['Schema'];
    }

    public function __construct() {
        $schema = self::Schema();

        if(is_null($schema))
            throw new DomainException("Domain ".get_called_class()." requires schema definition.");

        $keys = array();
        foreach($schema->Columns()->all() as $col)
            array_push($keys, $col->getAbsoluteName());

        $this->__cache = new DomainValueCache($keys);

        $pks = $schema->PrimaryKeys();
        $pkcols = array();
        foreach($pks as $pk) {
            $pkcols[$pk->column->name] = $pk;
        }

        foreach($schema->Columns()->all() as $col)
            if(!array_key_exists($col->name, $pkcols))
                $this->__cache->setValue($col->getAbsoluteName(), $col->type->default, true);

        $this->__collections = array();
        $this->__parentRelationships = array();
        $this->__parentRelationshipsColumnMap = Array();

        $self = $this;
        $dirtyChild = function() use($self) {
            $self->__dirtyChildren = true;
        };

        foreach(self::Relationships() as $as => $relationship) {
            if(!is_null($relationship['JoinTable'])) {
                $this->__collections[$as] = new SatelliteDomainCollection($this, $relationship['Domain'], $relationship['JoinTable']);
                $this->__collections[$as]->onAdded($dirtyChild);
                $this->__collections[$as]->onRemoved($dirtyChild);
            } else {
                $domain = $relationship['Domain'];
                $myFks = self::Schema()->ForeignKeys();

                $parentFk = null;

                /** @var ForeignKey $fk */
                foreach($myFks as $fk) {
                    if ($fk->table === $domain::Schema()->Table()) {
                        $parentFk = $fk;
                        break;
                    }
                }

                if(!is_null($parentFk)) {
                    $this->__parentRelationships[$as] = array();
                    $this->__parentRelationships[$as]['Domain'] = $domain;
                    $this->__parentRelationships[$as]['Column'] = $parentFk->column;
                    $this->__parentRelationships[$as]['On'] = $parentFk->on;
                    $this->__parentRelationships[$as]['Object'] = null;
                    $this->__parentRelationshipsColumnMap[$parentFk->column->name] = $as;
                } else { // otherwise assume it must be a child relationship
                    $this->__collections[$as] = new ChildDomainCollection($this, $relationship['Domain']);
                    $this->__collections[$as]->onAdded($dirtyChild);
                    $this->__collections[$as]->onRemoved($dirtyChild);
                }
            }
        }
    }

    public function __get($name) {
        $internal = (0 === strpos($name, 'internal_'));
        if ($internal) {
            $name = substr($name, strlen('internal_'));
        }

        if (!$internal && method_exists($this, ($method = 'get_'.$name))) {
            return $this->$method();
        } else if(self::Schema()->Columns()->contains($name)) {
            $col = self::Schema()->Columns()->getByName($name);
            return $this->__cache->getValue($col->getAbsoluteName());
        } else if (array_key_exists($name, $this->__collections)) {
            return $this->__collections[$name];
        } else if(array_key_exists($name, $this->__parentRelationships)) {
            return $this->__parentRelationships[$name]['Object'];
        }

        return null;
    }

    public function __set($name, $value) {
        $internal = (0 === strpos($name, 'internal_'));
        if ($internal) {
            $name = substr($name, strlen('internal_'));
        }

        if (!$internal && method_exists($this, ($method = 'set_'.$name))) {
            $this->$method($value);
        } else if(self::Schema()->Columns()->contains($name)) {
            $col = self::Schema()->Columns()->getByName($name);
            $this->raiseBeforeChange($col);
            $this->__cache->setValue($col->getAbsoluteName(), $value);
            $this->raiseChanged($col);
        } else if (array_key_exists($name, $this->__collections)) {
            throw new DomainException("Cannot directly set domain collection [".get_called_class()."->{$name}]");
        } else if (array_key_exists($name, $this->__parentRelationships)) {
            $childOnCol = $this->__parentRelationships[$name]['On']->name;
            $this->__set($this->__parentRelationships[$name]['Column']->name, $value->$childOnCol);
            $this->__parentRelationships[$name]['Object'] = $value;
        }
    }

    public function getInternalData() {
        $cols = self::Schema()->Columns()->all();
        $data = array();
        foreach($cols as $col) {
            if ($col->serializable)
                $data[$col->name] = $this->__cache->getValue($col->getAbsoluteName());
        }

        foreach($this->__collections as $relationship => $collection) {
            $data[$relationship] = array();

            foreach($collection->all() as $item) {
                array_push($data[$relationship], $item->getInternalData());
            }
        }

        foreach($this->__parentRelationships as $relationship => $value) {
            if(!is_null($value['Object']))
                $data[$relationship] = $value['Object']->getInternalData();
            else
                $data[$relationship] = null;
        }

        return $data;
    }

    public function serialize() {
        return serialize($this->getInternalData());
    }

    public function jsonSerialize() {
        return $this->getInternalData();
    }

    public function unserialize($data) {
        //TODO implement
    }

    public function __toString() {
        //TODO if the schema has primary keys we could likely simplify and use those. Or even use a hash of the record data
        $cols = self::Schema()->Columns()->all();
        $data = array();
        foreach($cols as $col) {
            if ($col->serializable)
                $data[$col->name] = $this->__cache->getValue($col->getAbsoluteName());
        }

        return json_encode($data);
    }

    protected function getValues($excludePrimaryKeys = false) {
        $data = array();

        $pkcols = array();
        $pks = self::Schema()->PrimaryKeys();
        foreach($pks as $pk)
            array_push($pkcols, $pk->column->name);

        $isPkCol = function($name) use ($pkcols) {
            foreach($pkcols as $pkcol)
                if($name === $pkcol) return true;

            return false;
        };

        foreach(self::Schema()->Columns()->all() as $col) {
            if ($excludePrimaryKeys && $isPkCol($col->name))
                continue;

            $data[$col->name] = $this->__cache->getValue($col->getAbsoluteName());
        }

        return $data;
    }

    protected function getValue($name) {
        if(self::Schema()->Columns()->contains($name))
            return $this->$name;

        return null;
    }

    protected function setValues($data) {
        $cols = array();
        foreach(self::Schema()->Columns()->all() as $col)
            if(array_key_exists($col->name, $data))
                array_push($cols, $col);

        $this->raiseBeforeChange(...$cols);

        foreach($cols as $col)
            $this->__cache->setValue($col->getAbsoluteName(), $data[$col->name], true);

        $this->raiseChanged(...$cols);
    }

    private function checkIsDirty() {
        return $this->__cache->hasChanged() || $this->__dirtyChildren;
    }

    private function checkIsNew() {
        $pks = self::Schema()->PrimaryKeys();

        $isNew = false;
        foreach($pks as $pk)
            $isNew = $isNew || is_null($this->__get($pk->column->name));

        return $isNew;
    }

    private function pkWhere($primaryKeyValues = null) {
        $values = $this->extractPkValues($primaryKeyValues);

        $wheres = array();

        if(count($values) > 0) {
            foreach($values as $key => $value) {
                array_push($wheres, Where::Equal(self::Schema()->Column($key), $value));
            }
        }

        if(count($wheres) > 1)
            return Where::_And(...$wheres);
        else if (count($wheres) == 1)
            return $wheres[0];

        return null;
    }

    private function extractPkValues($primaryKeyValues = null) {
        $pks = self::Schema()->PrimaryKeys();

        if(count($pks) <= 0)
            throw new DomainException("Schema on domain must have Primary Keys");

        $values = array();

        foreach ($pks as $pk) {
            $value = $this->__get($pk->column->name);

            if(!is_null($primaryKeyValues)) {
                if(is_array($primaryKeyValues))
                    $value = $primaryKeyValues[$pk->column->name];
                else
                    $value = $primaryKeyValues;
            }

            $values[$pk->column->name] = $value;
        }

        return $values;
    }

    private function hydrateRelationships() {
        /** @var DomainCollection $collection */
        foreach($this->__collections as $collection)
            $collection->hydrate();

        foreach($this->__parentRelationships as $as => $relationship) {
            $on = $relationship['On'];
            $domain = $relationship['Domain'];
            $column = $relationship['Column']->name;

            $obj = $domain::where(
                Where::Equal($on, $this->$column)
            );

            if(count($obj) == 1) {
                $this->__parentRelationships[$as]['Object'] = $obj[0];
                $self = $this;
                $this->__parentRelationships[$as]['Object']->onChanged(function() use ($self) { $self->__dirtyChildren = true; });
            }
            else if (count($obj) > 1) {
                throw new DomainException("Parent relationship [{$as}] found more than one record");
            } else {
                $this->__parentRelationships[$as]['Object'] = null;
            }
        }
    }

    protected function hydrate($pk = null) {
        $record = Database::select(
            Query::Select(
                self::Schema()->Table(),
                self::Schema()->Columns(),
                $this->pkWhere($pk)
            )
        );

        if(sizeof($record) <> 1) {
            if (sizeof($record) == 0) return false;
            else
                throw new DomainException("Primary Key based hydrate on {".get_called_class()."} returns more than one record.");
        }

        $this->setValues($record[0]);

        $this->hydrateRelationships();

        return true;
    }

    protected static function hydrateMany(Where $where = null, OrderBy $orderBy = null, $limit = null, $offset = null) {
        $class = get_called_class();

        $records = Database::select(
            Query::Select(
                self::Schema()->Table(),
                self::Schema()->Columns(),
                $where,
                $orderBy,
                (!is_null($limit)) ? Limit::Limit($limit) : null,
                (!is_null($offset)) ? Offset::Offset($offset) : null
            )
        );

        $items = array();
        foreach($records as $row) {
            /** @var Domain $obj */
            $obj = new $class();
            $obj->setValues($row);
            $obj->hydrateRelationships();
            array_push($items, $obj);
        }

        return $items;
    }

    public static function doCount(Where $where = null) {
        $class = get_called_class();

        $records = Database::count(
            Query::Count(
                self::Schema()->Table(),
                $where
            )
        );

        return (int)$records;
    }

    private static function arbitraryHydrate($sql) {
        $class = get_called_class();

        $records =  Database::arbitrary($sql);

        $items = array();
        foreach($records as $row) {
            /** @var Domain $obj */
            $obj = new $class();
            $obj->setValues($row);
            $obj->hydrateRelationships();
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
     * @param null $offset
     * @return array
     */
    public static function where(Where $where = null, OrderBy $orderBy = null, $limit = null, $offset = null) {
        return self::hydrateMany($where, $orderBy, $limit, $offset);
    }



    public static function count($filters, array $allowed_columns = null) {
        $where = self::constructFilterWhere($filters, $allowed_columns);

        return self::doCount($where);
    }

    /**
     * Returns a key value pair of data from this domain
     * @param $page
     * @param $size
     * @param $columns
     * @param $order
     * @param $filters
     * @param array $allowed_columns
     * @return array
     */
    public static function page($page, $size, $columns, $order, $filters, array $allowed_columns = null) {
        $columnNames = explode(",", $columns);
        $orders = explode(",", $order);

        if (count($allowed_columns) > 0)
            $columnNames = array_intersect($allowed_columns, $columnNames);

        $cols = [];
        $orderBys = [];

        foreach($orders as $col) {
            $isDesc = false;
            if (strpos($col, " desc")) {
                $isDesc = true;
                $col = str_replace(" desc", "" , $col);
            }

            if (self::Schema()->Columns()->contains($col))
                array_push($orderBys,
                    ($isDesc) ?
                        OrderBy::Descending(self::Schema()->Columns()->getByName($col))
                        : OrderBy::Ascending(self::Schema()->Columns()->getByName($col))
                );
        }

        /** @var OrderBy $orderBy */
        $orderBy = array_pop($orderBys);
        $orderBy->orderBy = $orderBys;

        foreach($columnNames as $col) {
            if (self::Schema()->Columns()->contains($col)) {
                array_push($cols, $col);
            }

            if (array_key_exists($col, self::Relationships()))
                array_push($cols, $col);
        }


        $where = self::constructFilterWhere($filters, $allowed_columns);

        $objects = self::where($where, $orderBy, $size, $page);

        $retval = [];

        foreach($objects as $object) {
            $val = [];

            foreach ($cols as $col) {
                if (array_key_exists($col, self::Relationships()))
                    $val[$col] = $object->$col->all();
                else
                    $val[$col] = $object->$col;
            }

            array_push($retval, $val);
        }

        return $retval;
    }

    /**
     * Constructs the WHERE clause for a filter expression
     * @param $filters
     * @param array $allowed_columns either an array of strings containing the list of columns allowed in a filter expression or null which means al columns are allowed
     * @return array
     */
    
    private static function constructFilterWhere($filters, array $allowed_columns = null) {
        $actualColumns = new Columns();

        if($allowed_columns == null) {
            // all table columns are allowed
            $actualColumns = self::Schema()->Columns();
        } else {
            // only some columns are allowed
            foreach($allowed_columns as $col) {
                if (self::Schema()->Columns()->contains($col)) {
                    $actualColumns->add(self::Schema()->Columns()->getByName($col));
                }
            }
        }

        return self::constructFilter($actualColumns, $filters);
    }


    /**
     * Expects an object format like:
     * Expression {
     *   left: Expression,
     *   operator: Operator,
     *   right: Expression,
     *   column: Column,
     *   value: Value
     * }
     * @param Columns $columns the filters that are allowed to be used in the filter
     * @param $filter
     * @return null|Where
     */
    private static function constructFilter(Columns $columns, $filter) {
        if (is_object($filter)) {

            if ($filter->operator != "and" && $filter->operator != "or")
                if (!$columns->contains($filter->column))
                    return null;

            switch($filter->operator) {
                case "and":
                    return Where::_And(self::constructFilter($columns, $filter->left), self::constructFilter($columns, $filter->right));
                case "or":
                    return Where::_Or(self::constructFilter($columns, $filter->left), self::constructFilter($columns, $filter->right));
                case "=":
                    return Where::Equal($columns->getByName($filter->column), $filter->value);
                case "!=":
                    return Where::NotEqual($columns->getByName($filter->column), $filter->value);
                case ">":
                    return Where::Greater($columns->getByName($filter->column), $filter->value);
                case "<":
                    return Where::Lesser($columns->getByName($filter->column), $filter->value);
                case ">=":
                    return Where::GreaterEqual($columns->getByName($filter->column), $filter->value);
                case "<=":
                    return Where::LesserEqual($columns->getByName($filter->column), $filter->value);
                case "like":
                    return Where::Like($columns->getByName($filter->column), $filter->value);
                case "is null":
                    return Where::Null($columns->getByName($filter->column));
                case "not null":
                    return Where::NotNull($columns->getByName($filter->column));
                default:
                    return null;
            }
        }
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

        $this->raiseBeforeSave();

        $isNew = $this->checkIsNew();

        if($isNew) {
            $this->raiseBeforeCreate();

            $pks = Database::insert(
                Query::Insert(
                    self::Schema()->Table(),
                    self::Schema()->Columns(),
                    $this->getValues(true)
                )
            );

            $this->setValues($this->extractPkValues($pks));
        } else {
            $this->raiseBeforeUpdate();

            Database::update(
                Query::Update(
                    self::Schema()->Table(),
                    self::Schema()->Columns(),
                    $this->pkWhere(),
                    $this->getValues(true)
                )
            );
        }

        /** @var DomainCollection $collection */
        foreach($this->__collections as $collection)
            $collection->save();

        foreach($this->__parentRelationships as $as => $relationship) {
            if(!is_null($this->__parentRelationships[$as]['Object']))
                $this->__parentRelationships[$as]['Object']->save();
        }

        $this->__dirtyChildren = false;

        $this->hydrate();

        if($isNew) {
            $this->raiseCreated();
        } else {
            $this->raiseUpdated();
        }

        $this->raiseSaved();

        return true;
    }

    public function delete() {

        $this->raiseBeforeDelete();

        Database::delete(
            Query::Delete(
                self::Schema()->Table(),
                $this->pkWhere()
            )
        );

        $pks = self::Schema()->PrimaryKeys();
        foreach($pks as $pk)
            $this->__set($pk->column->name, null);

        $this->raiseDeleted();
    }

    public function onBeforeChange(callable $listener) { $this->on("BeforeChange", $listener); }
    public static function onAnyBeforeChange(callable $listener) { self::staticOn("BeforeChange", $listener); }
    protected function raiseBeforeChange(Column ...$columns) { $this->raise("BeforeChange", ...$columns); self::staticRaise("BeforeChange", $this, ...$columns); }
    
    public function onChanged(callable $listener) { $this->on("Changed", $listener); }
    public static function onAnyChanged(callable $listener) { self::staticOn("Changed", $listener); }
    protected function raiseChanged(Column ...$columns) { $this->raise("Changed", ...$columns); self::staticRaise("Changed", $this, ...$columns); }

    public function onBeforeDelete(callable $listener) { $this->on("BeforeDelete", $listener); }
    public static function onAnyBeforeDelete(callable $listener) { self::staticOn("BeforeDelete", $listener); }
    protected function raiseBeforeDelete() { $this->raise("BeforeDelete"); self::staticRaise("BeforeDelete", $this); }

    public function onDeleted(callable $listener) { $this->on("Deleted", $listener); }
    public static function onAnyDeleted(callable $listener) { self::staticOn("Deleted", $listener); }
    protected function raiseDeleted() { $this->raise("Deleted"); self::staticRaise("Deleted", $this); }

    public function onBeforeSave(callable $listener) { $this->on("BeforeSave", $listener); }
    public static function onAnyBeforeSave(callable $listener) { self::staticOn("BeforeSave", $listener); }
    protected function raiseBeforeSave() { $this->raise("BeforeSave"); self::staticRaise("BeforeSave", $this); }

    public function onSaved(callable $listener) { $this->on("Saved", $listener); }
    public static function onAnySaved(callable $listener) { self::staticOn("Saved", $listener); }
    protected function raiseSaved() { $this->raise("Saved"); self::staticRaise("Saved", $this); }

    public function onBeforeCreate(callable $listener) { $this->on("BeforeCreate", $listener); }
    public static function onAnyBeforeCreate(callable $listener) { self::staticOn("BeforeCreate", $listener); }
    protected function raiseBeforeCreate() { $this->raise("BeforeCreate"); self::staticRaise("BeforeCreate", $this); }

    public function onCreated(callable $listener) { $this->on("Created", $listener); }
    public static function onAnyCreated(callable $listener) { self::staticOn("Created", $listener); }
    protected function raiseCreated() { $this->raise("Created"); self::staticRaise("Created", $this); }

    public function onBeforeUpdate(callable $listener) { $this->on("BeforeUpdate", $listener); }
    public static function onAnyBeforeUpdate(callable $listener) { self::staticOn("BeforeUpdate", $listener); }
    protected function raiseBeforeUpdate() { $this->raise("BeforeUpdate"); self::staticRaise("BeforeUpdate", $this); }

    public function onUpdated(callable $listener) { $this->on("Updated", $listener); }
    public static function onAnyUpdated(callable $listener) { self::staticOn("Updated", $listener); }
    protected function raiseUpdated() { $this->raise("Updated"); self::staticRaise("Updated", $this); }
}
