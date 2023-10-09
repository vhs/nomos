<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 12:10 PM
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class AppClientSchema extends Schema {
    public static function init() {
        $table = new Table('appclient');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('secret', Type::String());
        $table->addColumn('expires', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('userid', Type::Int());
        $table->addColumn('name', Type::String());
        $table->addColumn('description', Type::String());
        $table->addColumn('url', Type::String());
        $table->addColumn('redirecturi', Type::String());
        $table->addColumn('enabled', Type::Bool(false, false));

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->id),
            Constraint::ForeignKey($table->columns->userid, UserSchema::Table(), UserSchema::Columns()->id)
        );

        $table->setAccess(PrivilegedAccess::GenerateAccess('appclient', $table, $table->columns->userid));

        return $table;
    }
}
