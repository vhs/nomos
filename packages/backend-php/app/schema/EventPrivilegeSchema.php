<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:42 AM.
 */

namespace app\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class EventPrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('eventprivileges');

        $table->addColumn('eventid', Type::Int());
        $table->addColumn('privilegeid', Type::Int());
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->eventid),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->eventid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                EventSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                EventSchema::Columns()->id
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
