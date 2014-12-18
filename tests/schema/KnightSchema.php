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

class KnightSchema extends Schema {
    public function __construct() {
        $table = new Table("knights");
        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("swordid", Type::Int(false, 0));
        $table->addColumn("name", Type::String(false, "Mystery Knight", 50));
        $table->addColumn("birthdate", Type::DateTime());

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));
        $table->setConstraints(Constraint::ForeignKey($table->columns->swordid, SwordSchema::Table(), SwordSchema::Columns()->id));

        parent::__construct($table);
    }
}