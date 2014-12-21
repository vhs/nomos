<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:51 PM
 */

namespace vhs\database\engines\mysql;

use vhs\database\orders\IOrderByGenerator;
use vhs\database\orders\OrderBy;
use vhs\database\orders\OrderByAscending;
use vhs\database\orders\OrderByDescending;
use vhs\database\wheres\Where;
use vhs\database\wheres\WhereAnd;
use vhs\database\wheres\WhereComparator;
use vhs\database\wheres\IWhereGenerator;
use vhs\database\wheres\WhereOr;

class MySqlGenerator implements IWhereGenerator, IOrderByGenerator {

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
            $sql = $where->column->name;

            if($where->equal)
                $sql .= " IN (";
            else
                $sql .= " NOT IN (";

            foreach($where->value as $val)
                $sql .= "'" . $this->cleanValue($val) . "', ";

            $sql = substr($sql, 0, -2);

            $sql .= ")";

            return $sql;
        } else {
            $col = $where->column->name;
            $val = $this->cleanValue($where->value);
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

                return "{$col} {$sign} '{$val}'";
            }
        }
    }

    private function cleanValue($value) {
        //TODO escape values for safe databasing
        $val = $value;

        if($val === "true" || $val === true) return 1;
        if($val === "false" || $val === false) return 0;

        if(is_null($val)) return "null";

        return $val;
    }

    public function generateAscending(OrderByAscending $ascending) {
        return $this->gen($ascending, "ASC");
    }

    public function generateDescending(OrderByDescending $descending) {
        return $this->gen($descending, "DESC");
    }

    private function gen(OrderBy $orderBy, $type) {
        $clause = $orderBy->column->name . " " . $type . ", ";

        foreach($orderBy->orderBy as $n)
            /** @var OrderBy $n */
            $clause .= $n->generate($this) . ", ";

        $clause = substr($clause, 0, -2);

        return $clause;
    }
}
