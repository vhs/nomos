<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 3:23 PM.
 */

namespace app\domain;

use app\schema\MembershipPrivilegeSchema;
use app\schema\MembershipSchema;
use vhs\database\Columns;
use vhs\database\Database;
use vhs\database\orders\OrderBy;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $title
 * @property string $code
 * @property string $description
 * @property float  $price
 * @property int    $days
 * @property string $period
 * @property bool   $trial
 * @property bool   $recurring
 * @property bool   $private
 * @property bool   $active
 * @property object $privileges
 *
 * @typescript
 */
class Membership extends Domain {
    public const FRIEND = 'vhs_membership_friend';
    /* TODO HACK we should instead add privileges to the membership types and check those instead when checking types
     * however currently the metric service is also using these to determine new member types, etc so we need to figure
     * out how to do metrics a bit more dynamically. Prob by querying and looping through all the membership types instead
     * or have the client request them.
     */
    public const KEYHOLDER = 'vhs_membership_keyholder';
    public const MEMBER = 'vhs_membership_member';

    /**
     * Get a map of all code IDs.
     *
     * @return array<string,string>
     */
    public static function allCodeIdMap() {
        $rows = Database::select(
            Query::Select(MembershipSchema::Table(), new Columns(MembershipSchema::Column('id'), MembershipSchema::Column('code')))
        );

        $values = [];

        foreach ($rows as $row) {
            $values['id' . $row['id']] = $row['code'];
        }

        return $values;
    }

    /**
     * Undocumented function.
     *
     * @return string[]
     */
    public static function allCodes() {
        $rows = Database::select(Query::Select(MembershipSchema::Table(), new Columns(MembershipSchema::Column('code'))));

        $values = [];

        foreach ($rows as $row) {
            array_push($values, $row['code']);
        }

        return $values;
    }

    /**
     * Define.
     *
     * @return void
     */
    public static function Define() {
        Membership::Schema(MembershipSchema::Type());

        Membership::Relationship('privileges', Privilege::Type(), MembershipPrivilegeSchema::Type());
    }

    /**
     * Find membership by code.
     *
     * @param string $code
     *
     * @return Membership[]
     */
    public static function findByCode($code) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return Membership::where(Where::Equal(MembershipSchema::Columns()->code, $code));
    }

    /**
     * @param float $price
     *
     * @return Membership|null
     */
    public static function findForPriceLevel($price) {
        $memberships = Membership::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::LesserEqual(MembershipSchema::Columns()->price, $price),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(MembershipSchema::Columns()->active, true)
            ),
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            OrderBy::Descending(MembershipSchema::Columns()->price),
            1
        );

        if (!is_null($memberships) && !empty($memberships)) {
            return $memberships[0];
        }

        return null;
    }

    /**
     * validate.
     *
     * @param \vhs\domain\validations\ValidationResults $results
     *
     * @return void
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
