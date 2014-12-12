<?php

namespace {
    if (!defined("_VALID_PHP"))
        die('Direct access to this location is not allowed.');
}

namespace vhs {

    class ValidationResults {
        private $failures = array();

        /**
         * @param ValidationFailure $failure
         */
        public function add(ValidationFailure $failure) {
            array_push($this->failures, $failure);
        }

        /**
         * @return bool
         */
        public function isSuccess() {
            return (sizeof($this->failures) == 0);
        }

        /**
         * @return array
         */
        public function getFailures() {
            return $this->failures;
        }
    }

    class ValidationFailure {
        private $message;

        function __construct($message) {
            $this->message = $message;
        }

        public function getMessage() {
            return $this->message;
        }
    }

    class ValidationException extends \Exception {

        private $results;

        function __construct(ValidationResults $results) {
            $this->results = $results;

            $message = "Validation failed:";

            foreach($this->results->getFailures() as $failure) {
                $message .= "\t\n" . $failure->getMessage();
            }

            parent::__construct($message);
        }

        /**
         * @return ValidationResults
         */
        public function getResults() {
            return $this->results;
        }
    }

    class DomainException extends \Exception { }

    class InvalidColumnDefinitionException extends DomainException { }

    interface iDomain {
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

    abstract class Domain implements iDomain {
        private $pkValue = null;
        private $cache = array();

        protected $incomplete_column_definition = false;
        private static $db;

        private static function getDb() {
            if(is_null(self::$db))
                self::$db = \Registry::get("Database");

            return self::$db;
        }

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
                else if (!$this->incomplete_column_set)
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
                if($column === $pkcolumn) {
                    $this->setPrimaryKeyValue($value);
                } else {
                    if (isset($map[$column])) {
                        $this->$map[$column] = $value;
                        $this->cache[$column] = $value;
                    } else if (!$this->incomplete_column_set)
                        throw new InvalidColumnDefinitionException("Column '{$column}' is missing property definition on '" . get_called_class() . "'");
                }
            }
        }

        private function getValueForColumn($column) {
            $map = $this->getColumnPropertyMap();
            $class = get_called_class();

            if (isset($map[$column]))
                return $this->$map[$column];
            else if ($column === $class::getPrimaryKeyColumn())
                return $this->getPrimaryKeyValue();
            else if (!$this->incomplete_column_set)
                throw new InvalidColumnDefinitionException("Column '{$column}' is missing property definition on '" . get_called_class() . "'");
            else
                return null;
        }

        private function checkIsDirty() {
            $data = $this->getValues();

            $diff = array_diff($data, $this->cache);

            return sizeof($diff) > 0;
        }

        private function checkIsNew() {
            return is_null($this->pkValue);
        }

        private static function generateSelect($primaryKeyValue = null, $where = null) {
            $class = get_called_class();

            $table = $class::getTable();
            $pkcolumn = $class::getPrimaryKeyColumn();

            $sql = "SELECT * FROM {$table}";

            if(!is_null($primaryKeyValue))
                $sql .= " WHERE {$pkcolumn} = '{$primaryKeyValue}'";
            else if (!is_null($where))
                $sql .= " WHERE " . $where;

            return $sql;
        }

        private function doInsert() {
            $class = get_called_class();

            $this->setPrimaryKeyValue(self::getDb()->insert($class::getTable(), $this->getValues()));
        }

        private function doUpdate() {
            $class = get_called_class();

            $pkcolumn = $class::getPrimaryKeyColumn();
            $pkvalue = self::getDb()->escape($this->getValueForColumn($pkcolumn));

            self::getDb()->update($class::getTable(), $this->getValues(), "{$pkcolumn}='{$pkvalue}'");
        }

        protected function hydrate($primaryKeyValue = null) {
            if (is_null($primaryKeyValue)) {
                if (is_null($this->getPrimaryKeyValue()))
                    throw new \Exception("Attempt to hydrate without a PK!");
                else $primaryKeyValue = $this->getPrimaryKeyValue();
            }

            $this->setPrimaryKeyValue($primaryKeyValue);

            $sql = self::generateSelect($this->getPrimaryKeyValue());

            $queryid = self::getDb()->query($sql);

            $numrows = self::getDb()->numrows($queryid);
            if($numrows <> 1) {
                if ($numrows == 0) return false;
                else
                    throw new DomainException("Primary Key based hydrate on {".get_called_class()."} returns more than one record.");
            }

            $row = self::getDb()->fetch($queryid);

            $this->setValues($row);

            return true;
        }

        private static function arbitraryHydrate($sql) {
            $class = get_called_class();

            $records =  self::getDb()->fetch_all($sql);

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
            return self::arbitraryHydrate(self::generateSelect());
        }

        /**
         * @param $where
         * @return array
         */
        public static function where($where) {
            $clause = " ";
            foreach($where as $column => $value) {
                $col = self::getDb()->escape($column);
                $val = self::getDb()->escape($value);

                $clause .= " {$col} = {$val} AND";
            }

            $clause = substr($clause, -4, 4);

            return self::arbitraryHydrate(self::generateSelect(null, $clause));
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

            $table = $class::getTable();
            $pkcolumn = $class::getPrimaryKeyColumn();
            $pkvalue = $this->getPrimaryKeyValue();

            self::getDb()->delete($table, "{$pkcolumn} = {$pkvalue}");

            $this->setPrimaryKeyValue(null);
        }
    }
}
