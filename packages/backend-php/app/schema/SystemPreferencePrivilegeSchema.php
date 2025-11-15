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

/** @typescript */
class SystemPreferencePrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('systempreferenceprivileges');

        $table->addColumn('systempreferenceid', Type::Int());
        $table->addColumn('privilegeid', Type::Int());
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->systempreferenceid),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                $table->columns->systempreferenceid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                SystemPreferenceSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                SystemPreferenceSchema::Columns()->id
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
