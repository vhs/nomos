<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:54 PM.
 */

namespace tests\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/**
 * @method static \tests\domain\Knight Columns()
 *
 * @typescript
 */
class KnightSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('knights');
        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('swordid', Type::Int(false, 0));
        $table->addColumn('name', Type::String(false, 'Mystery Knight', 50));
        $table->addColumn('birthdate', Type::DateTime());

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->swordid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                SwordSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                SwordSchema::Columns()->id
            )
        );

        return $table;
    }
}
