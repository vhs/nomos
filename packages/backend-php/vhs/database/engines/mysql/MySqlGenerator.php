<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:51 PM.
 */

namespace vhs\database\engines\mysql;

use vhs\database\Column;
use vhs\database\exceptions\DatabaseException;
use vhs\database\IColumnGenerator;
use vhs\database\IOnGenerator;
use vhs\database\joins\IJoinGenerator;
use vhs\database\joins\Join;
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
use vhs\database\orders\OrderBy;
use vhs\database\orders\OrderByAscending;
use vhs\database\orders\OrderByDescending;
use vhs\database\queries\IQueryGenerator;
use vhs\database\queries\QueryCount;
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
use vhs\database\wheres\IWhereGenerator;
use vhs\database\wheres\Where;
use vhs\database\wheres\WhereAnd;
use vhs\database\wheres\WhereComparator;
use vhs\database\wheres\WhereOr;

/** @typescript */
class MySqlGenerator implements
    IWhereGenerator,
    IOrderByGenerator,
    ILimitGenerator,
    IOffsetGenerator,
    IQueryGenerator,
    ITypeGenerator,
    IJoinGenerator,
    IOnGenerator,
    IColumnGenerator {
    /** @var \mysqli */
    private $conn = null;

    /**
     * generateAnd.
     *
     * @param \vhs\database\wheres\WhereAnd $where
     *
     * @return string
     */
    public function generateAnd(WhereAnd $where) {
        $sql = '(';

        foreach ($where->wheres as $w) {
            /** @var Where $w */
            $sql .= '(' . $w->generate($this) . ') AND ';
        }

        $sql = substr($sql, 0, -5);

        $sql .= ')';

        return $sql;
    }

    /**
     * generateAscending.
     *
     * @param \vhs\database\orders\OrderByAscending $ascending
     *
     * @return string
     */
    public function generateAscending(OrderByAscending $ascending) {
        return $this->gen($ascending, 'ASC');
    }

    /**
     * generateBool.
     *
     * @param \vhs\database\types\TypeBool $type
     * @param bool|null                    $value
     *
     * @return string
     */
    public function generateBool(TypeBool $type, $value = null) {
        return $this->genVal(
            function ($val) {
                if (boolval($val) === true) {
                    return '1';
                } else {
                    return '0';
                }
            },
            $type,
            $value
        );
    }

    /**
     * generateColumn.
     *
     * @param \vhs\database\Column $column
     *
     * @return string
     */
    public function generateColumn(Column $column) {
        return "{$column->table->alias}.`{$column->name}`";
    }

    /**
     * generateComparator.
     *
     * @param \vhs\database\wheres\WhereComparator $where
     *
     * @return string
     */
    public function generateComparator(WhereComparator $where) {
        if ($where->isArray || (is_object($where->value) && get_class($where->value) == 'vhs\\database\\queries\\QuerySelect')) {
            $sql = $where->column->generate($this);

            if ($where->equal) {
                $sql .= ' IN (';
            } else {
                $sql .= ' NOT IN (';
            }

            if ($where->isArray && !(is_object($where->value) && get_class($where->value) == 'vhs\\database\\queries\\QuerySelect')) {
                foreach ($where->value as $val) {
                    $sql .= $where->column->type->generate($this, $val) . ', ';
                }

                $sql = substr($sql, 0, -2);
            } else {
                $sql .= $where->value->generate($this);
            }

            $sql .= ')';

            return $sql;
        } else {
            $col = $where->column->generate($this);
            $val = $where->value;
            $value = null;

            if (is_object($val) && get_class($val) == 'vhs\\database\\Column') {
                /** @var Column $val */
                $value = $val->generate($this);
            } else {
                $value = $where->column->type->generate($this, $where->value);
            }

            $sign = '';

            if ($where->null_compare) {
                if ($where->equal) {
                    $sign = 'IS NULL';
                } else {
                    $sign = 'IS NOT NULL';
                }

                return "{$col} {$sign}";
            } else {
                if ($where->greater) {
                    $sign .= '>';
                }
                if ($where->lesser) {
                    $sign .= '<';
                }
                if ($where->equal) {
                    $sign .= '=';
                } elseif (!$where->greater && !$where->lesser && !$where->like) {
                    $sign = '<>';
                } elseif ($where->like) {
                    $sign .= 'LIKE';
                }

                return "{$col} {$sign} {$value}";
            }
        }
    }

    /**
     * generateCross.
     *
     * @param \vhs\database\joins\JoinCross $join
     *
     * @return string
     */
    public function generateCross(JoinCross $join) {
        return "CROSS JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    /**
     * generateDate.
     *
     * @param \vhs\database\types\TypeDate $type
     * @param string|null                  $value
     *
     * @return string
     */
    public function generateDate(TypeDate $type, $value = null) {
        return $this->genVal(
            function ($val) {
                return (string) date('Y-m-d', strtotime(str_replace('-', '/', $val)));
            },
            $type,
            $value
        );
    }

    /**
     * generateDateTime.
     *
     * @param \vhs\database\types\TypeDateTime $type
     * @param string|null                      $value
     *
     * @return string
     */
    public function generateDateTime(TypeDateTime $type, $value = null) {
        return $this->genVal(
            function ($val) {
                return (string) date('Y-m-d H:i:s', strtotime(str_replace('-', '/', $val)));
            },
            $type,
            $value
        );
    }

    /**
     * generateDelete.
     *
     * @param \vhs\database\queries\QueryDelete $query
     *
     * @return string
     */
    public function generateDelete(QueryDelete $query) {
        $clause = !is_null($query->where) ? $query->where->generate($this) : '';

        $sql = "DELETE {$query->table->alias} FROM `{$query->table->name}` AS {$query->table->alias}";

        if (!empty($clause)) {
            $sql .= " WHERE {$clause}";
        }

        return $sql;
    }

    /**
     * generateDescending.
     *
     * @param \vhs\database\orders\OrderByDescending $descending
     *
     * @return string
     */
    public function generateDescending(OrderByDescending $descending) {
        return $this->gen($descending, 'DESC');
    }

    /**
     * generateEnum.
     *
     * @param \vhs\database\types\TypeEnum $type
     * @param string|null                  $value
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return string
     */
    public function generateEnum(TypeEnum $type, $value = null) {
        return $this->genVal(
            function ($val) use ($type) {
                $v = (string) $val;

                if (!in_array($v, $type->values)) {
                    throw new DatabaseException("Enum {$v} does not exist in Type::Enum");
                }

                return $v;
            },
            $type,
            $value
        );
    }

    /**
     * generateFloat.
     *
     * @param \vhs\database\types\TypeFloat $type
     * @param float|null                    $value
     *
     * @return string
     */
    public function generateFloat(TypeFloat $type, $value = null) {
        return $this->genVal(
            function ($val) {
                return floatval($val);
            },
            $type,
            $value
        );
    }

    /**
     * generateInner.
     *
     * @param \vhs\database\joins\JoinInner $join
     *
     * @return string
     */
    public function generateInner(JoinInner $join) {
        return "INNER JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    /**
     * generateInsert.
     *
     * @param \vhs\database\queries\QueryInsert $query
     *
     * @return string
     */
    public function generateInsert(QueryInsert $query) {
        $columns = [];
        $values = [];

        foreach ($query->values as $columnName => $value) {
            $column = $query->columns->getByName($columnName);
            array_push($columns, "`{$column->name}`");
            array_push($values, $column->type->generate($this, $value));
        }

        $columns = implode(', ', $columns);
        $values = implode(', ', $values);

        $sql = "INSERT INTO `{$query->table->name}` ({$columns}) VALUES ({$values})";

        return $sql;
    }

    /**
     * generateInt.
     *
     * @param \vhs\database\types\TypeInt $type
     * @param mixed                       $value
     *
     * @return string
     */
    public function generateInt(TypeInt $type, $value = null) {
        return $this->genVal(
            function ($val) {
                return intval($val);
            },
            $type,
            $value
        );
    }

    /**
     * generateLeft.
     *
     * @param \vhs\database\joins\JoinLeft $join
     *
     * @return string
     */
    public function generateLeft(JoinLeft $join) {
        return "LEFT JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    /**
     * generateLimit.
     *
     * @param \vhs\database\limits\Limit $limit
     *
     * @return string
     */
    public function generateLimit(Limit $limit) {
        $clause = '';
        if (isset($limit->limit) && is_numeric($limit->limit)) {
            $clause = sprintf(' LIMIT %s ', intval($limit->limit));
        }

        return $clause;
    }

    /**
     * generateOffset.
     *
     * @param \vhs\database\offsets\Offset $offset
     *
     * @return string
     */
    public function generateOffset(Offset $offset) {
        $clause = '';
        if (isset($offset->offset) && is_numeric($offset->offset)) {
            $clause = sprintf(' OFFSET %s ', intval($offset->offset));
        }

        return $clause;
    }

    /**
     * generateOn.
     *
     * @param \vhs\database\On $on
     *
     * @return string
     */
    public function generateOn(On $on) {
        return '(' . $on->where->generate($this) . ')';
    }

    /**
     * generateOr.
     *
     * @param \vhs\database\wheres\WhereOr $where
     *
     * @return string
     */
    public function generateOr(WhereOr $where) {
        $sql = '(';

        foreach ($where->wheres as $w) {
            /** @var Where $w */
            $sql .= '(' . $w->generate($this) . ') OR ';
        }

        $sql = substr($sql, 0, -4);

        $sql .= ')';

        return $sql;
    }

    /**
     * generateOuter.
     *
     * @param \vhs\database\joins\JoinOuter $join
     *
     * @return string
     */
    public function generateOuter(JoinOuter $join) {
        return "OUTER JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    /**
     * generateRight.
     *
     * @param \vhs\database\joins\JoinRight $join
     *
     * @return string
     */
    public function generateRight(JoinRight $join) {
        return "RIGHT JOIN {$join->table->name} {$join->table->alias} ON " . $join->on->generate($this);
    }

    /**
     * generateSelect.
     *
     * @param \vhs\database\queries\QuerySelect $query
     *
     * @return string
     */
    public function generateSelect(QuerySelect $query) {
        $selector = implode(
            ', ',
            array_map(function (Column $column) {
                return $column->generate($this);
            }, $query->columns->all())
        );
        $clause = !is_null($query->where) ? $query->where->generate($this) : '';
        $orderClause = !is_null($query->orderBy) ? $query->orderBy->generate($this) : '';
        $limit = !is_null($query->limit) ? $query->limit->generate($this) : '';
        $offset = !is_null($query->offset) ? $query->offset->generate($this) : '';

        $sql = "SELECT {$selector} FROM `{$query->table->name}` AS {$query->table->alias}";

        if (!is_null($query->joins)) {
            /** @var \vhs\database\joins\Join $join */
            foreach ($query->joins as $join) {
                $sql .= ' ' . $join->generate($this);
            }
        }

        if (!empty($clause)) {
            $sql .= " WHERE {$clause}";
        }

        if (!empty($orderClause)) {
            $sql .= " ORDER BY {$orderClause}";
        }

        if (!empty($limit)) {
            $sql .= " {$limit}";
        }

        if (!empty($offset)) {
            $sql .= " {$offset}";
        }

        return $sql;
    }

    /**
     * generateSelectCount.
     *
     * @param \vhs\database\queries\QueryCount $query
     *
     * @return string
     */
    public function generateSelectCount(QueryCount $query) {
        $clause = !is_null($query->where) ? $query->where->generate($this) : '';
        $orderClause = !is_null($query->orderBy) ? $query->orderBy->generate($this) : '';
        $limit = !is_null($query->limit) ? $query->limit->generate($this) : '';
        $offset = !is_null($query->offset) ? $query->offset->generate($this) : '';

        $sql = "SELECT COUNT(*) FROM `{$query->table->name}` AS {$query->table->alias}";

        if (!is_null($query->joins)) {
            /** @var Join $join */
            foreach ($query->joins as $join) {
                $sql .= ' ' . $join->generate($this);
            }
        }

        if (!empty($clause)) {
            $sql .= " WHERE {$clause}";
        }

        if (!empty($orderClause)) {
            $sql .= " ORDER BY {$orderClause}";
        }

        if (!empty($limit)) {
            $sql .= " {$limit}";
        }

        if (!empty($offset)) {
            $sql .= " {$offset}";
        }

        return $sql;
    }

    /**
     * generateString.
     *
     * @param \vhs\database\types\TypeString $type
     * @param mixed                          $value
     *
     * @throws \vhs\database\exceptions\DatabaseException
     *
     * @return string
     */
    public function generateString(TypeString $type, $value = null) {
        return $this->genVal(
            function ($val) use ($type) {
                $v = (string) $val;

                if (strlen($v) > $type->length) {
                    throw new DatabaseException("Value of Type::String exceeds defined length of {$type->length}");
                }

                return $v;
            },
            $type,
            $value
        );
    }

    /**
     * generateText.
     *
     * @param \vhs\database\types\TypeText $type
     * @param mixed                        $value
     *
     * @return string
     */
    public function generateText(TypeText $type, $value = null) {
        return $this->genVal(
            // @phpstan-ignore closure.unusedUse
            function ($val) use ($type) {
                return (string) $val;
            },
            $type,
            $value
        );
    }

    /**
     * generateUpdate.
     *
     * @param \vhs\database\queries\QueryUpdate $query
     *
     * @return string
     */
    public function generateUpdate(QueryUpdate $query) {
        $clause = !is_null($query->where) ? $query->where->generate($this) : '';
        $setsql = implode(
            ', ',
            array_map(
                function ($columnName, $value) use ($query) {
                    $column = $query->columns->getByName($columnName);

                    return $column->generate($this) . ' = ' . $column->type->generate($this, $value);
                },
                array_keys($query->values),
                array_values($query->values)
            )
        );

        $sql = "UPDATE `{$query->table->name}` AS {$query->table->alias} SET {$setsql}";

        if (!empty($clause)) {
            $sql .= " WHERE {$clause}";
        }

        return $sql;
    }

    /**
     * Dammit we need this because of how real_escape_string works
     *  it requires a connection because it uses whatever the charset
     *  is on the db to figure escaping.
     *
     * @param \mysqli $conn
     *
     * @return void
     */
    public function SetMySqli(\mysqli $conn) {
        $this->conn = $conn;
    }

    /**
     * gen.
     *
     * @param OrderBy $orderBy
     * @param mixed   $type
     *
     * @return string
     */
    private function gen(OrderBy $orderBy, $type) {
        $clause = $orderBy->column->generate($this) . " {$type}, ";

        foreach ($orderBy->orderBy as $n) {
            /** @var OrderBy $n */
            $clause .= $n->generate($this) . ', ';
        }

        $clause = substr($clause, 0, -2);

        return $clause;
    }

    /**
     * genVal.
     *
     * @param callable $gen
     * @param Type     $type
     * @param mixed    $value
     *
     * @return string
     */
    private function genVal(callable $gen, Type $type, $value = null) {
        if (is_null($value)) {
            if ($type->nullable) {
                return 'NULL';
            } else {
                return $type->generate($this, $type->default);
            }
        }

        $val = $gen($value);

        if (!is_null($this->conn)) {
            $val = $this->conn->real_escape_string($val);
        }

        return "'{$val}'";
    }
}
