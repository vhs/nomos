<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:40 AM
 */

namespace app\schema;


use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class KeySchema extends Schema {
    public function __construct() {
        $table = new Table("keys");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("userid", Type::Int(false, 0));
        $table->addColumn("type", Type::Enum("undefined", "api", "rfid", "pin"));
        $table->addColumn("key", Type::String(true, null, 255));
        $table->addColumn("created", Type::DateTime(false, date("Y-m-d H:i:s")));
        $table->addColumn("notes", Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->userid, UserSchema::Table(), UserSchema::Columns()->id)
        );

        parent::__construct($table);
    }
}