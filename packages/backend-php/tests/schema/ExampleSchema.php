<?php

namespace tests\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/**
 * @method static \tests\domain\ExampleDomain Columns()
 *
 * @typescript
 */
class ExampleSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('example', null);

        $table->addColumn('id', Type::Int());
        $table->addColumn('testA', Type::String(true));
        $table->addColumn('testB', Type::String(true));
        $table->addColumn('testC', Type::String(true));

        // TODO fix proper typing
        // @phpstan-ignore property.notFound
        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        return $table;
    }
}
