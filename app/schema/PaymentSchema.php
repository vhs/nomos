<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:43 AM
 */

namespace app\schema;


use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;
use app\schema\MembershipSchema;
use app\schema\UserSchema;

class PaymentSchema extends Schema {
    public static function init() {

        $table = new Table("payments");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("txn_id", Type::String(false, "", 100));  //txn_id
        $table->addColumn("membership_id", Type::Int(true, 0));
        $table->addColumn("user_id", Type::Int(true, 0));
        $table->addColumn("payer_email", Type::String(true, null, 255));
        $table->addColumn("payer_fname", Type::String(true, null, 255));
        $table->addColumn("payer_lname", Type::String(true, null, 255));
        $table->addColumn("rate_amount", Type::String(false, "", 255));
        $table->addColumn("currency", Type::String(true, null, 4));
        $table->addColumn("date", Type::DateTime(false, date("Y-m-d H:i:s")));
        $table->addColumn("pp", Type::Enum("PayPal", "MoneyBookers", "Stripe"));
        $table->addColumn("ip", Type::String(true, null, 20));
        $table->addColumn("status", Type::Int(false, 0)); // 1==completed, anything else is "pending"
        $table->addColumn("item_name", Type::String(true, null, 255));
        $table->addColumn("item_number", Type::String(true, null, 255));

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->membership_id, MembershipSchema::Table(), MembershipSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->user_id, UserSchema::Table(), UserSchema::Columns()->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess("payment", $table, $table->columns->user_id));

        return $table;
    }
}
