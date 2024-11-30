<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 2/5/2016
 * Time: 10:36 AM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class SystemPreferenceSchema extends Schema {
    public static function init() {
        $table = new Table('systempreferences');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('key', Type::String(false, '', 255));
        $table->addColumn('value', Type::Text(true));
        $table->addColumn('enabled', Type::Bool(false, true));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        $table->setAccess(PrivilegedAccess::GenerateAccess('systempreference', $table));

        return $table;
    }
}
