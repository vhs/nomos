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
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->userid),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->userid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                UserSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                UserSchema::Columns()->id
            ),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->privilegeid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                PrivilegeSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                PrivilegeSchema::Columns()->id
            )
        );

        return $table;
    }
}
