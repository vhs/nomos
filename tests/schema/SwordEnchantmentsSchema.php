<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:55 PM
 */

namespace tests\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class SwordEnchantmentsSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('swordenchantments');

        $table->addColumn('swordid', Type::Int(false, 0));
        $table->addColumn('enchantmentid', Type::Int(false, 0));

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->swordid),
            Constraint::PrimaryKey($table->columns->enchantmentid),
            Constraint::ForeignKey($table->columns->swordid, SwordSchema::Table(), SwordSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->enchantmentid, EnchantmentSchema::Table(), EnchantmentSchema::Columns()->id)
        );

        return $table;
    }
}
