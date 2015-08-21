<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:51 PM
 */

namespace vhs\database\engines\mysql;

use vhs\database\Column;
use vhs\database\IColumnGenerator;
use vhs\database\IOnGenerator;
use vhs\database\joins\IJoinGenerator;
use vhs\database\joins\Join;
use vhs\database\joins\JoinCross;
use vhs\database\joins\JoinInner;
use vhs\database\joins\JoinLeft;
use vhs\database\joins\JoinOuter;
use vhs\database\joins\JoinRight;
use vhs\database\On;
use vhs\database\orders\IOrderByGenerator;
use vhs\database\orders\OrderBy;
use vhs\database\orders\OrderByAscending;
use vhs\database\orders\OrderByDescending;
use vhs\database\queries\IQueryGenerator;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\database\types\ITypeGenerator;
use vhs\database\types\Type;
use vhs\database\types\TypeBool;
use vhs\database\types\TypeDate;
use vhs\database\types\TypeDateTime;
use vhs\database\types\TypeEnum;
use vhs\database\types\TypeFloat;
use vhs\database\types\TypeInt;
use vhs\database\types\TypeString;
use vhs\database\types\TypeText;
use vhs\database\wheres\Where;
use vhs\database\wheres\WhereAnd;
use vhs\database\wheres\WhereComparator;
use vhs\database\wheres\IWhereGenerator;
use vhs\database\limits\ILimitGenerator;
use vhs\database\limits\Limit;
use vhs\database\offsets\IOffsetGenerator;
use vhs\database\offsets\Offset;
use vhs\database\wheres\WhereOr;

class MySqlGenerator implements
    IWhereGenerator,
    IOrderByGenerator,
    ILimitGenerator,
    IOffsetGenerator,
    IQueryGenerator,
    ITypeGenerator,
    IJoinGenerator,
    IOnGenerator,
    IColumnGenerator
    {

    /**
     * @var \mysqli
     */
    private $conn = null;

    /**
     * Dammit we need this because of how real_escape_string works
     *  it requires a connection because it uses whatever the charset
     *  is on the db to figure escaping
     * @param \mysqli $conn
     */
    public function SetMySqli(\mysqli $conn) {
        $this->conn = $conn;
    }

    public function generateAnd(WhereAnd $where) {
        $sql = "(";

        foreach($where->wheres as $w)
            /** @var Where $w */
            $sql .= "(" . $w->generate($this) . ") AND ";

        $sql = substr($sql, 0, -5);

        $sql .= ")";

        return $sql;
    }

    public function generateOr(WhereOr $where) {
        $sql = "(";

        foreach($where->wheres as $w)
            /** @var Where $w */
            $sql .= "(" . $w->generate($this) . ") OR ";

        $sql = substr($sql, 0, -4);

        $sql .= ")";

        return $sql;
    }

    public function generateComparator(WhereComparator $where) {
        if ($where->isArray) {
            $sql = $where->column->generate($this);

            if($where->equal)
                $sql .= " IN (";
            else
                $sql .= " NOT IN (";

            foreach($where->value as $val)
                $sql .= "'" . $this->cleanValue($val, $where->column->type) . "', ";

            $sql = substr($sql, 0, -2);

            $sql .= ")";

            return $sql;
        } else {
            $col = $where->column->generate($this);
            $val = $where->value;
            $value = null;

            if(is_object($val) && get_class($val) == "vhs\\database\\Column") {
                /** @var Column $val */
                $value = $val->generate($this);
            } else {
                $value = "'" . $this->cleanValue($where->value, $where->column->type) . "'";
            }

            $sign = "";

            if($where->null_compare) {
                if ($where->equal) $sign = "IS NULL";
                else $sign = "IS NOT NULL";

                return "{$col} {$sign}";
            } else {
                if ($where->greater) $sign .= ">";
                if ($where->lesser) $sign .= "<";
                if ($where->equal) $sign .= "=";
                else if(!$where->greater && !$where->lesser) $sign = "<>";

                return "{$col} {$sign} {$value}";
            }
        }
    }

    private function cleanValue($value, Type $type = null) {
        $val = $value;

        if(is_null($val)) return "null";

        if(!is_null($type))
            $val = $type->generate($this, $value);

        return (string) $val;
    }

    public function generateAscending(OrderByAscending $ascending) {
        return $this->gen($ascending, "ASC");
    }

    public function generateDescending(OrderByDescending $descending) {
        return $this->gen($descending, "DESC");
    }

    private function gen(OrderBy $orderBy, $type) {
        $clause = $orderBy->column->generate($this) . " {$type}, ";

        foreach($orderBy->orderBy as $n)
            /** @var OrderBy $n */
            $clause .= $n->generate($this) . ", ";

        $clause = substr($clause, 0, -2);

        return $clause;
    }

    public function generateLimit(Limit $limit) {
        $clause = "";
        if(isset($limit->limit) && is_numeric($limit->limit)) {
            $clause = sprintf(" LIMIT %s ", intval($limit->limit));
        }
        return $clause;
    }

    public function generateOffset(Offset $offset) {
        $clause = "";
        if(isset($offset->offset) && is_numeric($offset->offset)) {
            $clause = sprintf(" OFFSET %s ", intval($offset->offset));
        }
        return $clause;
    }

    public function generateSelect(QuerySelect $query)
    {
        $selector = implode(", ", array_map(function(Column $column) { return $column->generate($this); }, $query->columns->all()));
        $clause = (!is_null($query->where)) ? $query->where->generate($this) : "";
        $orderClause = (!is_null($query->orderBy)) ? $query->orderBy->generate($this) : "";
        $limit = (!is_null($query->limit)) ? $query->limit->generate($this) : "";
        $offset = (!is_null($query->offset)) ? $query->offset->generate($this) : "";

        $sql = "SELECT {$selector} FROM `{$query->table->name}` AS {$query->table->alias}";

        if(!is_null($query->joins)) {
            /** @var Join $join */
            foreach($query->joins as $join) {
                $sql .= " " . $join->generate($this);
            }
        }

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        if(!empty($orderClause))
            $sql .= " ORDER BY {$orderClause}";

        if(!empty($limit))
            $sql .= " {$limit}";

        if(!empty($offset))
            $sql .= " {$offset}";

        return $sql;
    }

    public function generateInsert(QueryInsert $query)
    {
        $columns = array();
        $values = array();

        foreach($query->values as $columnName => $value) {
            $column = $query->columns->getByName($columnName);
            array_push($columns, "`{$column->name}`");
            array_push($values, "'" . $this->cleanValue($value, $column->type) . "'");
        }

        $columns = implode(", ", $columns);
        $values = implode(", ", $values);

        $sql = "INSERT INTO `{$query->table->name}` ({$columns}) VALUES ({$values})";

        return $sql;
    }

    public function generateUpdate(QueryUpdate $query)
    {
        $clause = (!is_null($query->where)) ? $query->where->generate($this) : "";
        $setsql = implode(", ",
            array_map(
                function($columnName, $value) use($query)
                {
                    $column = $query->columns->getByName($columnName);
                    return $column->generate($this) . " = '" . $this->cleanValue($value, $column->type) . "'";
                },
                array_keys($query->values),
                array_values($query->values)
            )
        );

        $sql = "UPDATE `{$query->table->name}` AS {$query->table->alias} SET {$setsql}";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        return $sql;
    }

    public function generateDelete(QueryDelete $query)
    {
        $clause = (!is_null($query->where)) ? $query->where->generate($this) : "";

        $sql = "DELETE FROM `{$query->table->name}` AS {$query->table->alias}";

        if(!empty($clause))
            $sql .= " WHERE {$clause}";

        return $sql;
    }

    public function generateBool(TypeBool $type, $value = null)
    {
        $val = boolval($value);

        if ($val === true)
            return "1";
        else
            return "0";
    }

    public function generateInt(TypeInt $type, $value = null)
    {
        $val = intval($value);

        return (string) $val;
    }

    public function generateFloat(TypeFloat $type, $value = null)
    {
        $val = floatval($value);

        return (string) $val;
    }

    public function generateString(TypeString $type, $value = null)
    {
        $val = $value;

        if (!is_null($this->conn))
            $val = $this->conn->real_escape_string($value);

        return (string) $val;
    }

    public function generateText(TypeText $type, $value = null)
    {
        $val = $value;

        if (!is_null($this->conn))
            $val = $this->conn->real_escape_string($value);

        return (string) $val;
    }

    public function generateDate(TypeDate $type, $value = null)
    {
        $val = date('Y-m-d', strtotime(str_replace('-', '/', $value)));

        return (string) $val;
    }

    public function generateDateTime(TypeDateTime $type, $value = null)
    {
        $val = date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $value)));

        return (string) $val;
    }

    public function generateEnum(TypeEnum $type, $value = null)
    {
        $val = $value;

        if (!is_null($this->conn))
            $val = $this->conn->real_escape_string($value);

        return (string) $val;
    }

    public function generateLeft(JoinLeft $join)
    {
        return "LEFT JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    public function generateRight(JoinRight $join)
    {
        return "RIGHT JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    public function generateOuter(JoinOuter $join)
    {
        return "OUTER JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    public function generateInner(JoinInner $join)
    {
        return "INNER JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    public function generateCross(JoinCross $join)
    {
        return "CROSS JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    public function generateOn(On $on)
    {
        return "(".$on->where->generate($this).")";
    }

    public function generateColumn(Column $column)
    {
        return "{$column->table->alias}.`{$column->name}`";
    }
}
