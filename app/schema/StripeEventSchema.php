<?php

/**
 * Created by: Fuck you, I am not giving you my name
 * User: TyIsI
 * Date: 2020-11-18
 * Time: like, midnight almost
 */

namespace app\schema;


use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class StripeEventSchema extends Schema
{
    public static function init()
    {
        $table = new Table("stripe_events");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("ts", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("status", Type::Enum("VALID", "UNKNOWN"));
        $table->addColumn("created", Type::Int(false, 0));
        $table->addColumn("event_id", Type::String(false, "", 255));
        $table->addColumn("type", Type::String(false, "", 255));
        $table->addColumn("object", Type::String(false, "", 255));
        $table->addColumn("request", Type::String(false, "", 255));
        $table->addColumn("api_version", Type::String(false, "", 255));
        $table->addColumn("raw", Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess("stripe_events", $table));

        return $table;
    }
}
