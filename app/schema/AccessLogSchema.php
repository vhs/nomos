<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:36 AM
 */

namespace app\schema;


use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class AccessLogSchema extends Schema {
    public function __construct() {
        $table = new Table("accesslog");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("rfid_key", Type::String(false, "", 64));
        $table->addColumn("authorized", Type::Bool(false, false));
        $table->addColumn("from_ip", Type::String(false, "", 15));
        $table->addColumn("time", Type::DateTime(false, date("Y-m-d H:i:s")));

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        parent::__construct($table);
    }
}