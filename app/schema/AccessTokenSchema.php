<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/5/2016
 * Time: 6:26 PM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class AccessTokenSchema extends Schema {
    public static function init() {
        $table = new Table('accesstoken');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('token', Type::String());
        $table->addColumn('expires', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('userid', Type::Int());
        $table->addColumn('appclientid', Type::Int());

        $table->setConstraints(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Constraint::PrimaryKey($table->columns->id),

            // TODO implement proper typing
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
                $table->columns->appclientid,
                // TODO implement proper typing
                // @phpstan-ignore argument.byRef
                AppClientSchema::Table(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                AppClientSchema::Columns()->id
            )
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess('accesstoken', $table));

        return $table;
    }
}
