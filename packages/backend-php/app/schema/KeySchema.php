<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:40 AM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class KeySchema extends Schema {
    public static function init() {
        $table = new Table('keys');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('userid', Type::Int());
        $table->addColumn('type', Type::Enum('undefined', 'api', 'rfid', 'pin', 'github', 'google', 'slack'));
        $table->addColumn('key', Type::String(true, null, 255));
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());
        $table->addColumn('expires', Type::DateTime());

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->id),
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
            )
        );

        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        $table->setAccess(PrivilegedAccess::GenerateAccess('key', $table, $table->columns->userid));

        return $table;
    }
}
