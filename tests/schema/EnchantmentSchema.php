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

class EnchantmentSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('enchantments');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('name', Type::String(false, 'Mystery Enchament', 50));
        $table->addColumn('bonus', Type::Float(false, 1.1));

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        return $table;
    }
}
