<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:55 PM.
 */

namespace tests\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class SwordEnchantmentsSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('swordenchantments');

        $table->addColumn('swordid', Type::Int(false, 0));
        $table->addColumn('enchantmentid', Type::Int(false, 0));

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->swordid),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->enchantmentid),
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
            ),
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
            )
        );

        return $table;
    }
}
