<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:39 AM.
 */

namespace app\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class KeyPrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('keyprivileges');

        $table->addColumn('keyid', Type::Int());
        $table->addColumn('privilegeid', Type::Int());
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->keyid),
            Constraint::PrimaryKey($table->columns->privilegeid),
            // @phpstan-ignore argument.byRef
            Constraint::ForeignKey($table->columns->keyid, KeySchema::Table(), KeySchema::Columns()->id),
            // @phpstan-ignore argument.byRef
            Constraint::ForeignKey($table->columns->privilegeid, PrivilegeSchema::Table(), PrivilegeSchema::Columns()->id)
        );

        return $table;
    }
}
