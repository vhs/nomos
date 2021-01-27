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

class UserSchema extends Schema
{
    public static function init()
    {

        $table = new Table("users");

        $table->addColumn("id", Type::Int(false, 0));
        $table->addColumn("username", Type::String(false, "", 255));
        $table->addColumn("password", Type::String(false, "", 255), false);
        $table->addColumn("membership_id", Type::Int(false, 0));
        $table->addColumn("mem_expire", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("trial_used", Type::Bool(false, false));
        $table->addColumn("email", Type::String(false, "", 255));
        $table->addColumn("fname", Type::String(false, "", 32));
        $table->addColumn("lname", Type::String(false, "", 32));
        $table->addColumn("token", Type::String(false, "0", 40));
        $table->addColumn("cookie_id", Type::String(false, "0", 64));
        $table->addColumn("newsletter", Type::Bool(false, false));
        $table->addColumn("cash", Type::Bool(false, false));
        $table->addColumn("userlevel", Type::Int(false, 1));
        $table->addColumn("notes", Type::Text());
        $table->addColumn("created", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("lastlogin", Type::DateTime(true, date("Y-m-d H:i:s")));
        $table->addColumn("lastip", Type::String(true, "0", 16));
        $table->addColumn("avatar", Type::String(true, "0", 150));
        $table->addColumn("active", Type::Enum("n", "y", "t", "b"));
        $table->addColumn("paypal_id", Type::String(false, "", 255));
        $table->addColumn("payment_email", Type::String(false, "", 255));
        $table->addColumn("stripe_id", Type::String(false, "", 255));
        $table->addColumn("stripe_email", Type::String(false, "", 255));

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->membership_id, MembershipSchema::Table(), MembershipSchema::Columns()->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess("user", $table, $table->columns->id));

        return $table;
    }
}
