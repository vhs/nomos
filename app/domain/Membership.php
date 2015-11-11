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
use vhs\database\orders\OrderBy;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Membership extends Domain {
    public static function Define() {
        Membership::Schema(MembershipSchema::Type());

        Membership::Relationship("privileges", Privilege::Type(), MembershipPrivilegeSchema::Type());
    }

    public function validate(ValidationResults &$results) {

    }

    /**
     * @param $code
     * @return Membership[]
     */
    public static function findByCode($code) {
        return Membership::where(
            Where::Equal(MembershipSchema::Columns()->code, $code)
        );
    }

    /**
     * @param $price
     * @return Membership
     */
    public static function findForPriceLevel($price) {
        $memberships = Membership::where(
            Where::_And(
                Where::LesserEqual(MembershipSchema::Columns()->price, $price),
                Where::Equal(MembershipSchema::Columns()->active, true)
            ), OrderBy::Descending(MembershipSchema::Columns()->price), 1
        );

        if (!is_null($memberships) && count($memberships) > 0)
            return $memberships[0];

        return null;
    }
}
