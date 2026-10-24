<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 10/02/2015
 * Time: 7:49 PM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class PasswordResetRequestSchema extends Schema {
    public static function init() {
        $table = new Table('passwordresetrequests');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('userid', Type::Int());
        $table->addColumn('token', Type::String(true, null, 255));
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));

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
        $table->setAccess(PrivilegedAccess::GenerateAccess('passwordresetrequest', $table, $table->columns->userid));

        return $table;
    }
}
