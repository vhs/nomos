<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:14 AM.
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class WebHookSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('webhooks');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('name', Type::String(false, '', 255));
        $table->addColumn('description', Type::Text());
        $table->addColumn('enabled', Type::Bool(false, false));
        $table->addColumn('userid', Type::Int());
        $table->addColumn('url', Type::String(false, '', 255));
        $table->addColumn('translation', Type::Text());
        $table->addColumn('headers', Type::Text());
        $table->addColumn('method', Type::String(false, 'POST', 32));
        $table->addColumn('eventid', Type::Int());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->userid, UserSchema::Table(), UserSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->eventid, EventSchema::Table(), EventSchema::Columns()->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess('webhook', $table, $table->columns->userid));

        return $table;
    }
}
