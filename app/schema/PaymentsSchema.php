<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:43 AM
 */

namespace app\schema;


use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class PaymentsSchema extends Schema {
    public static function init() {

        $table = new Table("payments");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("transactionref", Type::String(false, "", 100));  //txn_id
        $table->addColumn("membership_id", Type::Int(false, 0));
        $table->addColumn("rate_amount", Type::String(false, "", 255));
        $table->addColumn("currency", Type::String(false, "", 3));
        $table->addColumn("date", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("paymentprocessor", Type::String(false, "", 255));
        $table->addColumn("ip", Type::String(false, "", 20));
        $table->addColumn("status", Type::Int(false, 0));


        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id)
        ); 

        return $table;
    }
}
