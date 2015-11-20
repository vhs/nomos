<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/19/2015
 * Time: 7:07 PM
 */

namespace app\schema;


use vhs\database\Table;
use vhs\domain\Domain;
use vhs\database\types\Type;
use vhs\domain\Schema;

class GenuineCardSchema extends Schema {
    public static function init() {
        $table = new Table("genuinecard");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("created", Type::DateTime(false, date("Y-m-d H:i:s")));
        $table->addColumn("issued", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("active", Type::Bool(false, false));
        $table->addColumn("payment_id", Type::Int(true, 0));
        $table->addColumn("user_id", Type::Int(true, 0));
        $table->addColumn("owneremail", Type::String(true, "", 255));
    }
}