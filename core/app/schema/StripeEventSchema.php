<?php

namespace app\schema;


use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class StripeEventSchema extends Schema {
    public static function init() {
        $table = new Table("stripeevents");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("created", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("validation", Type::Enum("VERIFIED", "INVALID"));
        $table->addColumn("type", Type::String(false, "", 255));
        $table->addColumn("objectid", Type::String(false, "", 255));
        $table->addColumn("raw", Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess("stripeevent", $table));

        return $table;
    }
}

