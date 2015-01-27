<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 3:09 PM
 */

namespace app\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class MembershipSchema extends Schema {
    public static function init() {

        $table = new Table("memberships");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("title", Type::String(false, "", 255));
        $table->addColumn("code", Type::String(false, "", 50));
        $table->addColumn("description", Type::Text());
        $table->addColumn("price", Type::Float(false, 0.00));
        $table->addColumn("days", Type::Int(false, 0));
        $table->addColumn("period", Type::String(false, "D", 1));
        $table->addColumn("trial", Type::Bool(false, false));
        $table->addColumn("recurring", Type::Bool(false, false));
        $table->addColumn("private", Type::Bool(false, false));
        $table->addColumn("active", Type::Bool(false, false));

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        return $table;
    }
}