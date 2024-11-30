<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 7:49 PM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class PasswordResetRequestSchema extends Schema {
    public static function init() {
        $table = new Table('passwordresetrequests');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('userid', Type::Int());
        $table->addColumn('token', Type::String(true, null, 255));
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->userid, UserSchema::Table(), UserSchema::Columns()->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess('passwordresetrequest', $table, $table->columns->userid));

        return $table;
    }
}
