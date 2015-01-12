<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 17/12/2014
 * Time: 5:54 PM
 */

namespace tests\schema;


use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class SwordSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table("swords");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("name", Type::String(false, "Mystery Sword", 50));
        $table->addColumn("damage", Type::Int(false, 5));

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        return $table;
    }
}