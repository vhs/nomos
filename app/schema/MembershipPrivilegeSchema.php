<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 5:12 PM
 */

namespace app\schema;


use vhs\database\constraints\Constraint;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;

class MembershipPrivilegeSchema extends Schema {
    public function __construct() {

        $table = new Table("membershipprivileges");

        $table->addColumn("membershipid", Type::Int());
        $table->addColumn("privilegeid", Type::Int());
        $table->addColumn("created", Type::DateTime(false, date("Y-m-d H:i:s")));
        $table->addColumn("notes", Type::Text());

        $table->setConstraints(
            Constraint::PrimaryKey($table->columns->membershipid),
            Constraint::PrimaryKey($table->columns->privilegeid),
            Constraint::ForeignKey($table->columns->membershipid, MembershipSchema::Table(), MembershipSchema::Columns()->id),
            Constraint::ForeignKey($table->columns->privilegeid, PrivilegeSchema::Table(), PrivilegeSchema::Columns()->id)
        );

        parent::__construct($table);
    }
}
