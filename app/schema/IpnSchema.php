<?php
/**
 * Created by: Fuck you, I am not giving you my name
 * User: Steven Smethurst
 * Date: 2015Jul25
 */

namespace app\schema;


use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class UserSchema extends Schema {
    public static function init() {

        $table = new Table("ipn");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("created", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("validation", Type::Enum("yes", "no"));
        $table->addColumn("payment_status", Type::String(false, "", 255));
        $table->addColumn("payment_amount", Type::String(false, "", 255));
        $table->addColumn("payment_currency", Type::String(false, "", 255));
        $table->addColumn("payer_email", Type::String(false, "", 255));
        $table->addColumn("raw", Type::String(false, "", 255));

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
        );

        return $table;
    }
}
