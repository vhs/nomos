<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 14/01/2015
 * Time: 11:03 AM.
 */

namespace app\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class UserPrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('userprivileges');

        $table->addColumn('userid', Type::Int());
        $table->addColumn('privilegeid', Type::Int());
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->userid),
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey($table->columns->userid, UserSchema::Table(), UserSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->privilegeid, PrivilegeSchema::Table(), PrivilegeSchema::Columns()->id)
        );

        return $table;
    }
}
