<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 6:19 PM
 */

namespace vhs\database\engines;


use vhs\database\WhereAnd;
use vhs\database\WhereComparator;
use vhs\database\WhereGenerator;
use vhs\database\WhereOr;

class InMemoryWhereGenerator extends WhereGenerator {

    public function generateAnd(WhereAnd $where) {
        $wheres = array();

        foreach($where->wheres as $w) {
            array_push($wheres, $w->generate($this));
        }

        return function($row) use ($wheres) {
            $b = true;
            foreach($wheres as $w)
                $b = $b && $w($row);

            return $b;
        };
    }

    public function generateOr(WhereOr $where) {
        $wheres = array();

        foreach($where->wheres as $w) {
            array_push($wheres, $w->generate($this));
        }

        return function($row) use ($wheres) {
            $b = false;
            foreach($wheres as $w)
                $b = $b || $w($row);

            return $b;
        };
    }

    public function generateComparator(WhereComparator $where)
    {
        return function($row) use ($where) {
            $column = $where->column;
            $value = $where->value;

            if(!array_key_exists($column, $row))
                return array();

            $item = $row[$column];

            if($where->isArray) {
                if (in_array($item, $value)) {
                    if ($where->equal) return true;
                } else {
                    if (!$where->equal) return true;
                }

                return false;
            }

            if($where->lesser) {
                if ($where->equal) {
                    if ($item <= $value) return true;
                } else {
                    if ($item < $value) return true;
                }

                return false;
            }

            if($where->greater) {
                if ($where->equal) {
                    if ($item >= $value) return true;
                } else {
                    if ($item > $value) return true;
                }

                return false;
            }

            if($where->null_compare) {
                if ($where->equal) {
                    if (is_null($item)) return true;
                } else {
                    if (!is_null($item)) return true;
                }

                return false;
            }

            if ($where->equal) {
                if ($item === $value) return true;
            } else {
                if ($item !== $value) return true;
            }

            return false;
        };
    }
}