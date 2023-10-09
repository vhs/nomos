<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/19/2015
 * Time: 7:07 PM
 */

namespace app\schema;

use app\security\PrivilegedAccess;
use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class GenuineCardSchema extends Schema {
    public static function init() {
        $table = new Table('genuinecard');

        $table->addColumn('id', Type::Int(false, 0));
        $table->addColumn('key', Type::String(false, '', 255));
        $table->addColumn('created', Type::DateTime(false, date('Y-m-d H:i:s')));
        $table->addColumn('issued', Type::DateTime(true, null));
        $table->addColumn('active', Type::Bool(false, false));
        $table->addColumn('paymentid', Type::Int(true, 0));
        $table->addColumn('userid', Type::Int(true, 0));
        $table->addColumn('owneremail', Type::String(true, '', 255));
        $table->addColumn('notes', Type::String(true, '', 255));

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        $table->setAccess(PrivilegedAccess::GenerateAccess('genuinecard', $table, $table->columns->userid));

        return $table;
    }
}
