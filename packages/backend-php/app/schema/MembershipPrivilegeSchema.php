<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:12 PM.
 */

namespace app\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class MembershipPrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('membershipprivileges');

        $table->addColumn('membershipid', Type::Int());
        $table->addColumn('privilegeid', Type::Int());
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->membershipid),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->membershipid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                MembershipSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                MembershipSchema::Columns()->id
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
