<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/5/2016
 * Time: 6:26 PM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class AccessTokenSchema extends Schema {
    public static function init() {
        $table = new Table('accesstoken');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('token', Type::String());
        $table->addColumn('expires', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('userid', Type::Int());
        $table->addColumn('appclientid', Type::Int());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->userid, UserSchema::Table(), UserSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->appclientid, AppClientSchema::Table(), AppClientSchema::Columns()->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess('accesstoken', $table));

        return $table;
    }
}
