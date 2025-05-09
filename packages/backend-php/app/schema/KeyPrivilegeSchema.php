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
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->keyid),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->privilegeid),
            // TODO implement proper typing
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->keyid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                KeySchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                KeySchema::Columns()->id
            ),
            // TODO implement proper typing
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
