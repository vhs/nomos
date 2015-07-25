<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 15/04/2015
 * Time: 10:05 AM
 */

namespace app\contracts;

use vhs\services\IContract;


interface IMembershipService1 extends IContract {

    /*
$table->addColumn("id", Type::Int(false, 0));
$table->addColumn("title", Type::String(false, "", 255));
$table->addColumn("code", Type::String(false, "", 50));
$table->addColumn("description", Type::Text());
$table->addColumn("price", Type::Float(false, 0.00));
$table->addColumn("days", Type::Int(false, 0));
$table->addColumn("period", Type::String(false, "D", 1));
$table->addColumn("trial", Type::Bool(false, false));
$table->addColumn("recurring", Type::Bool(false, false));
$table->addColumn("private", Type::Bool(false, false));
$table->addColumn("active", Type::Bool(false, false));
*/

    public function CreateMembership($title, $code, $description);

    public function PutMembershipPrivileges($membershipid, $privileges);

    

}