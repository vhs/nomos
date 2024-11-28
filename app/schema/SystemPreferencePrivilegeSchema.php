<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 10:43 AM.
 */

namespace app\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class SystemPreferencePrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('systempreferenceprivileges');

        $table->addColumn('systempreferenceid', Type::Int());
        $table->addColumn('privilegeid', Type::Int());
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->systempreferenceid),
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey($table->columns->systempreferenceid, SystemPreferenceSchema::Table(), SystemPreferenceSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->privilegeid, PrivilegeSchema::Table(), PrivilegeSchema::Columns()->id)
        );

        return $table;
    }
}
