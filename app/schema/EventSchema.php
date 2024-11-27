<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:30 AM
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class EventSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('events');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('name', Type::String(false, '', 255));
        $table->addColumn('domain', Type::String(false, '', 255));
        $table->addColumn('event', Type::String(false, '', 255));
        $table->addColumn('description', Type::Text());
        $table->addColumn('enabled', Type::Bool(false, false));

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        $table->setAccess(PrivilegedAccess::GenerateAccess('event', $table));

        return $table;
    }
}
