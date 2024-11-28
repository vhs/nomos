<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 6:19 PM.
 */

namespace vhs\database\engines\memory;

use vhs\database\Column;
use vhs\database\constraints\ForeignKey;
use vhs\database\constraints\IConstraintGenerator;
use vhs\database\constraints\PrimaryKey;
use vhs\database\IColumnGenerator;
use vhs\database\IOnGenerator;
use vhs\database\ITableGenerator;
use vhs\database\joins\IJoinGenerator;
use vhs\database\joins\JoinCross;
use vhs\database\joins\JoinInner;
use vhs\database\joins\JoinLeft;
use vhs\database\joins\JoinOuter;
use vhs\database\joins\JoinRight;
use vhs\database\limits\ILimitGenerator;
use vhs\database\limits\Limit;
use vhs\database\offsets\IOffsetGenerator;
use vhs\database\offsets\Offset;
use vhs\database\On;
use vhs\database\orders\IOrderByGenerator;
use vhs\database\orders\OrderByAscending;
use vhs\database\orders\OrderByDescending;
use vhs\database\queries\IQueryGenerator;
use vhs\database\queries\QueryCount;
use vhs\database\queries\QueryDelete;
use vhs\database\queries\QueryInsert;
use vhs\database\queries\QuerySelect;
use vhs\database\queries\QueryUpdate;
use vhs\database\Table;
use vhs\database\types\ITypeGenerator;
use vhs\database\types\TypeBool;
use vhs\database\types\TypeDate;
use vhs\database\types\TypeDateTime;
use vhs\database\types\TypeEnum;
use vhs\database\types\TypeFloat;
use vhs\database\types\TypeInt;
use vhs\database\types\TypeString;
use vhs\database\types\TypeText;
use vhs\database\wheres\IWhereGenerator;
use vhs\database\wheres\Where;
use vhs\database\wheres\WhereAnd;
use vhs\database\wheres\WhereComparator;
use vhs\database\wheres\WhereOr;

class InMemoryGenerator implements
    IWhereGenerator,
    IOrderByGenerator,
    IConstraintGenerator,
    ITypeGenerator,
    IJoinGenerator,
    IQueryGenerator,
    IColumnGenerator,
    ITableGenerator,
    ILimitGenerator,
    IOffsetGenerator,
    IOnGenerator {
    public function generateAnd(WhereAnd $where) {
        $wheres = [];

        /** @var Where $w */
        foreach ($where->wheres as $w) {
            array_push($wheres, $w->generate($this));
        }

        return function ($row) use ($wheres) {
            $b = true;
            foreach ($wheres as $w) {
                $b = $b && $w($row);
            }

            return $b;
        };
    }

    public function generateAscending(OrderByAscending $ascending) {
        // TODO: Implement generateAscending() method.
        throw new \Exception('TODO: Implement generateAscending() method.');
    }

    public function generateBool(TypeBool $type, $value = null) {
        // TODO: Implement generateBool() method.
    }

    public function generateColumn(Column $column) {
        // TODO: Implement generateColumn() method.
    }

    public function generateComparator(WhereComparator $where) {
        return function ($row) use ($where) {
            $column = $where->column->name;
            $value = $where->value;

            if (!array_key_exists($column, $row)) {
                return [];
            }

            $item = $row[$column];

            if ($where->isArray) {
                if (in_array($item, $value)) {
                    if ($where->equal) {
                        return true;
                    }
                } else {
                    if (!$where->equal) {
                        return true;
                    }
                }

                return false;
            }

            if ($where->lesser) {
                if ($where->equal) {
                    if ($item <= $value) {
                        return true;
                    }
                } else {
                    if ($item < $value) {
                        return true;
                    }
                }

                return false;
            }

            if ($where->greater) {
                if ($where->equal) {
                    if ($item >= $value) {
                        return true;
                    }
                } else {
                    if ($item > $value) {
                        return true;
                    }
                }

                return false;
            }

            if ($where->null_compare) {
                if ($where->equal) {
                    if (is_null($item)) {
                        return true;
                    }
                } else {
                    if (!is_null($item)) {
                        return true;
                    }
                }

                return false;
            }

            if ($where->equal) {
                if ($item === $value) {
                    return true;
                }
            } else {
                if ($item !== $value) {
                    return true;
                }
            }

            if ($where->like) {
                return strpos($item, $value) != false;
            }

            return false;
        };
    }

    public function generateCross(JoinCross $join) {
        // TODO: Implement generateCross() method.
    }

    public function generateDate(TypeDate $type, $value = null) {
        // TODO: Implement generateDate() method.
    }

    public function generateDateTime(TypeDateTime $type, $value = null) {
        // TODO: Implement generateDateTime() method.
    }

    public function generateDelete(QueryDelete $query) {
        // TODO: Implement generateDelete() method.
    }

    public function generateDescending(OrderByDescending $descending) {
        // TODO: Implement generateDescending() method.
        throw new \Exception('Implement generateDescending() method.');
    }

    public function generateEnum(TypeEnum $type, $value = null) {
        // TODO: Implement generateEnum() method.
    }

    public function generateFloat(TypeFloat $type, $value = null) {
        // TODO: Implement generateFloat() method.
    }

    public function generateForeignKey(ForeignKey $constraint) {
        // TODO: Implement generateForeignKey() method.
    }

    public function generateInner(JoinInner $join) {
        // TODO: Implement generateInner() method.
    }

    public function generateInsert(QueryInsert $query) {
        // TODO: Implement generateInsert() method.
    }

    public function generateInt(TypeInt $type, $value = null) {
        // TODO: Implement generateInt() method.
    }

    public function generateLeft(JoinLeft $join) {
        // TODO: Implement generateLeft() method.
    }

    public function generateLimit(Limit $limit) {
        return $limit->limit;
    }

    public function generateOffset(Offset $offset) {
        return $offset->offset;
    }

    public function generateOn(On $on) {
        // TODO: Implement generateOn() method.
    }

    public function generateOr(WhereOr $where) {
        $wheres = [];

        /** @var Where $w */
        foreach ($where->wheres as $w) {
            array_push($wheres, $w->generate($this));
        }

        return function ($row) use ($wheres) {
            $b = false;
            foreach ($wheres as $w) {
                $b = $b || $w($row);
            }

            return $b;
        };
    }

    public function generateOuter(JoinOuter $join) {
        // TODO: Implement generateOuter() method.
    }

    public function generatePrimaryKey(PrimaryKey $constraint) {
        // TODO: Implement generatePrimaryKey() method.
    }

    public function generateRight(JoinRight $join) {
        // TODO: Implement generateRight() method.
    }

    public function generateSelect(QuerySelect $query) {
        // TODO: Implement generateSelect() method.
    }

    public function generateSelectCount(QueryCount $query) {
        // TODO: Implement generateSelect() method.
    }

    public function generateString(TypeString $type, $value = null) {
        // TODO: Implement generateString() method.
    }

    public function generateTable(Table $ascending) {
        // TODO: Implement generateTable() method.
    }

    public function generateText(TypeText $type, $value = null) {
        // TODO: Implement generateText() method.
    }

    public function generateUpdate(QueryUpdate $query) {
        // TODO: Implement generateUpdate() method.
    }
}
