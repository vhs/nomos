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

/** @typescript */
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
    /**
     * generateAnd.
     *
     * @param \vhs\database\wheres\WhereAnd $where
     *
     * @return callable
     */
    public function generateAnd(WhereAnd $where) {
        $wheres = [];

        /** @var Where $w */
        foreach ($where->wheres as $w) {
            array_push($wheres, $w->generate($this));
        }

        /**
         * lambda.
         *
         * @return bool
         */
        return function ($row) use ($wheres) {
            $b = true;

            foreach ($wheres as $w) {
                $b = $b && $w($row);
            }

            return $b;
        };
    }

    /**
     * generateAscending.
     *
     * @param \vhs\database\orders\OrderByAscending $ascending
     *
     * @return void
     */
    public function generateAscending(OrderByAscending $ascending) {
        // TODO: Implement generateAscending() method.
        throw new \Exception('TODO: Implement generateAscending() method.');
    }

    /**
     * generateBool.
     *
     * @param \vhs\database\types\TypeBool $type
     * @param scalar                       $value
     *
     * @return void
     */
    public function generateBool(TypeBool $type, $value = null) {
        // TODO: Implement generateBool() method.
    }

    /**
     * generateColumn.
     *
     * @param \vhs\database\Column $column
     *
     * @return void
     */
    public function generateColumn(Column $column) {
        // TODO: Implement generateColumn() method.
    }

    /**
     * generateComparator.
     *
     * @param \vhs\database\wheres\WhereComparator $where
     *
     * @return callable
     */
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

    /**
     * generateCross.
     *
     * @param \vhs\database\joins\JoinCross $join
     *
     * @return void
     */
    public function generateCross(JoinCross $join) {
        // TODO: Implement generateCross() method.
    }

    /**
     * generateDate.
     *
     * @param \vhs\database\types\TypeDate $type
     * @param scalar                       $value
     *
     * @return void
     */
    public function generateDate(TypeDate $type, $value = null) {
        // TODO: Implement generateDate() method.
    }

    /**
     * generateDateTime.
     *
     * @param \vhs\database\types\TypeDateTime $type
     * @param scalar                           $value
     *
     * @return void
     */
    public function generateDateTime(TypeDateTime $type, $value = null) {
        // TODO: Implement generateDateTime() method.
    }

    /**
     * generateDelete.
     *
     * @param \vhs\database\queries\QueryDelete $query
     *
     * @return void
     */
    public function generateDelete(QueryDelete $query) {
        // TODO: Implement generateDelete() method.
    }

    /**
     * generateDescending.
     *
     * @param \vhs\database\orders\OrderByDescending $descending
     *
     * @return void
     */
    public function generateDescending(OrderByDescending $descending) {
        // TODO: Implement generateDescending() method.
        throw new \Exception('Implement generateDescending() method.');
    }

    /**
     * generateEnum.
     *
     * @param \vhs\database\types\TypeEnum $type
     * @param scalar                       $value
     *
     * @return void
     */
    public function generateEnum(TypeEnum $type, $value = null) {
        // TODO: Implement generateEnum() method.
    }

    /**
     * generateFloat.
     *
     * @param \vhs\database\types\TypeFloat $type
     * @param scalar                        $value
     *
     * @return void
     */
    public function generateFloat(TypeFloat $type, $value = null) {
        // TODO: Implement generateFloat() method.
    }

    /**
     * generateForeignKey.
     *
     * @param \vhs\database\constraints\ForeignKey $constraint
     *
     * @return void
     */
    public function generateForeignKey(ForeignKey $constraint) {
        // TODO: Implement generateForeignKey() method.
    }

    /**
     * generateInner.
     *
     * @param \vhs\database\joins\JoinInner $join
     *
     * @return void
     */
    public function generateInner(JoinInner $join) {
        // TODO: Implement generateInner() method.
    }

    /**
     * generateInsert.
     *
     * @param \vhs\database\queries\QueryInsert $query
     *
     * @return void
     */
    public function generateInsert(QueryInsert $query) {
        // TODO: Implement generateInsert() method.
    }

    /**
     * generateInt.
     *
     * @param \vhs\database\types\TypeInt $type
     * @param scalar                      $value
     *
     * @return void
     */
    public function generateInt(TypeInt $type, $value = null) {
        // TODO: Implement generateInt() method.
    }

    /**
     * generateLeft.
     *
     * @param \vhs\database\joins\JoinLeft $join
     *
     * @return void
     */
    public function generateLeft(JoinLeft $join) {
        // TODO: Implement generateLeft() method.
    }

    /**
     * generateLimit.
     *
     * @param \vhs\database\limits\Limit $limit
     *
     * @return int
     */
    public function generateLimit(Limit $limit) {
        return $limit->limit;
    }

    /**
     * generateOffset.
     *
     * @param Offset $offset
     *
     * @return mixed
     */
    public function generateOffset(Offset $offset) {
        return $offset->offset;
    }

    /**
     * generateOn.
     *
     * @param On $on
     *
     * @return void
     */
    public function generateOn(On $on) {
        // TODO: Implement generateOn() method.
    }

    /**
     * generateOr.
     *
     * @param WhereOr $where
     *
     * @return callable
     */
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

    /**
     * generateOuter.
     *
     * @param JoinOuter $join
     *
     * @return void
     */
    public function generateOuter(JoinOuter $join) {
        // TODO: Implement generateOuter() method.
    }

    /**
     * generatePrimaryKey.
     *
     * @param PrimaryKey $constraint
     *
     * @return void
     */
    public function generatePrimaryKey(PrimaryKey $constraint) {
        // TODO: Implement generatePrimaryKey() method.
    }

    /**
     * generateRight.
     *
     * @param JoinRight $join
     *
     * @return void
     */
    public function generateRight(JoinRight $join) {
        // TODO: Implement generateRight() method.
    }

    /**
     * generateSelect.
     *
     * @param QuerySelect $query
     *
     * @return void
     */
    public function generateSelect(QuerySelect $query) {
        // TODO: Implement generateSelect() method.
    }

    /**
     * generateSelectCount.
     *
     * @param QueryCount $query
     *
     * @return void
     */
    public function generateSelectCount(QueryCount $query) {
        // TODO: Implement generateSelect() method.
    }

    /**
     * generateString.
     *
     * @param TypeString $type
     * @param mixed      $value
     *
     * @return void
     */
    public function generateString(TypeString $type, $value = null) {
        // TODO: Implement generateString() method.
    }

    /**
     * generateTable.
     *
     * @param \vhs\database\Table $table
     *
     * @return void
     */
    public function generateTable(Table $table) {
        // TODO: Implement generateTable() method.
    }

    /**
     * generateText.
     *
     * @param TypeText $type
     * @param scalar   $value
     *
     * @return void
     */
    public function generateText(TypeText $type, $value = null) {
        // TODO: Implement generateText() method.
    }

    /**
     * generateUpdate.
     *
     * @param QueryUpdate $query
     *
     * @return void
     */
    public function generateUpdate(QueryUpdate $query) {
        // TODO: Implement generateUpdate() method.
    }
}
