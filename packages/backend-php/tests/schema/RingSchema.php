<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 18/12/2014
 * Time: 6:07 PM.
 */

namespace tests\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class RingSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('rings');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('name', Type::String(false, 'Mystery Ring', 50));
        $table->addColumn('knightid', Type::Int(false, 0));
        $table->addColumn('enchantmentid', Type::Int(false, 0));

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->enchantmentid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                EnchantmentSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                EnchantmentSchema::Columns()->id
            ),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->knightid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                KnightSchema::Table(),
                KnightSchema::Columns()->id
            )
        );

        return $table;
    }
}
