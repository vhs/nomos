<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/7/2016
 * Time: 10:26 AM.
 */

namespace app\schema;

use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

/** @typescript */
class WebHookPrivilegeSchema extends Schema {
    public static function init() {
        $table = new Table('webhookprivileges');

        $table->addColumn('webhookid', Type::Int());
        $table->addColumn('privilegeid', Type::Int());
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('notes', Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->webhookid),
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey($table->columns->webhookid, WebHookSchema::Table(), WebHookSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->privilegeid, PrivilegeSchema::Table(), PrivilegeSchema::Columns()->id)
        );

        return $table;
    }
}
