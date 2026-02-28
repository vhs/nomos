<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 16/12/2014
 * Time: 12:42 AM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class PrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('privileges');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('name', Type::String(false, '', 255));
        $table->addColumn('code', Type::String(false, '', 50));
        $table->addColumn('description', Type::Text());
        $table->addColumn('icon', Type::String(false, '', 255));
        $table->addColumn('enabled', Type::Bool(false, false));

        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        $table->setAccess(PrivilegedAccess::GenerateAccess('privilege', $table));

        return $table;
    }
}
