<?php
/**
 * Created by: Fuck you, I am not giving you my name
 * User: Steven Smethurst
 * Date: 2015Jul25 
 * Time: like, midnight almost
 */

namespace app\schema;


use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class IpnSchema extends Schema {
    public static function init() {
        $table = new Table("ipnrequest");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("created", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("validation", Type::Enum("VERIFIED", "INVALID"));
        $table->addColumn("payment_status", Type::String(false, "", 255));
        $table->addColumn("payment_amount", Type::String(false, "", 255));
        $table->addColumn("payment_currency", Type::String(false, "", 255));
        $table->addColumn("payer_email", Type::String(false, "", 255));
        $table->addColumn("item_name", Type::String(false, "", 255));
        $table->addColumn("item_number", Type::String(false, "", 255));
        $table->addColumn("raw", Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess("ipn", $table));

        return $table;
    }
}

