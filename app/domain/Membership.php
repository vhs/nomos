<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 3:23 PM
 */

namespace app\domain;


use app\schema\MembershipPrivilegeSchema;
use app\schema\MembershipSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Membership extends Domain {
    public static function Define() {
        Membership::Schema(MembershipSchema::Type());

        Membership::Relationship("privileges", Privilege::Type(), MembershipPrivilegeSchema::Type());
    }

    public function validate(ValidationResults &$results) {

    }
}