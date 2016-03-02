<?php
/**
 * Created by PhpStorm.
 * User: JARRETT OKAY
 * Date: 22/01/2015
 * Time: like, midnight almost
 */

namespace app\schema;


use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class EmailSchema extends Schema {
    public static function init() {
        $table = new Table("email_templates");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("name", Type::String(true, null, 255));
        $table->addColumn("code", Type::String(true, null, 255));
        $table->addColumn("subject", Type::String(true, null, 255));
        $table->addColumn("help", Type::String(true, null, 255));
        $table->addColumn("body", Type::Text());
        $table->addColumn("html", Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id)
        );

        return $table;
    }
}