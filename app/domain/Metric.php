<?php
/**
 * User: James Sapara
 */

namespace app\domain;

use app\schema\PaymentSchema;
use app\schema\UserSchema;
use app\domain\User;
use vhs\database\Database;
use vhs\database\On;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\database\joins\Join;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Metric extends Domain {
    public static function Define() {
        
    }

    public function validate(ValidationResults &$results) {

    }

    /**
     * Get the total new members recorded in the date range
     * @param $start int unixtime
     * @param $end int unixtime
     */
    public static function NewMemberCount($start, $end) {
      
      $where = Where::_And(
        Where::Equal(UserSchema::Columns()->active,"y"),
        Where::_And(
          Where::GreaterEqual(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $start)),
          Where::Lesser(UserSchema::Columns()->created, date('Y-m-d 00:00:00', $end))
        )
      );

      $query = Query::count(UserSchema::Table(), $where);

      $count = Database::count($query);
      
      return $count;
    }

    /**
     * Get the total members in the date range
     * @param $start int unixtime
     * @param $end int unixtime
     */
    public static function TotalMemberCount($start, $end) {
      $where = Where::_And(
        Where::Equal(UserSchema::Columns()->active,"y"),
        Where::Equal(PaymentSchema::Columns()->status, 1),
        Where::_And(
          Where::GreaterEqual(PaymentSchema::Columns()->date, date('Y-m-d 00:00:00', $start)),
          Where::Lesser(PaymentSchema::Columns()->date, date('Y-m-d 00:00:00', $end))
        )
      );

      $query = Query::count(UserSchema::Table(), $where);

      $joinPayments = Join::Left(
        PaymentSchema::Table,
        On::Where(
          Where::Equal(UserSchema::Columns()->id,PaymentSchema::Columns()->user_id)
        )
      );
      $query->Join($joinPayments);

      $count = Database::count($query);
      
      return $count;
    }

    /**
     * Get the total new memberships of a type recorded in the date range.
     * @TODO we should either support sub queries or make a view for this
     * @param $membership_ip int
     * @param $start int unixtime
     * @param $end int unixtime
     */
    public static function NewMembershipByIdCount($membership_id, $start, $end) {
      $query = "
      SELECT COUNT(*) FROM (
        SELECT P.user_id, P.membership_id, COUNT(*) as c, MIN(P.date) as min, MAX(P.date) as max
        FROM payments AS P
        WHERE
        P.status=1
        GROUP BY P.user_id, P.membership_id
      ) AS PV WHERE
      PV.membership_id=%s AND PV.min >= '%s' AND PV.min <= '%s';";
      $result = Database::arbitrary(sprintf($query, $membership_id, date('Y-m-d 00:00:00', $start), date('Y-m-d 23:59:59', $end)));
      
      if (count($result) > 0) {
        return $result[0][0];
      }
      
      return 0;
    }

    /**
     * Get the total memberships of a type recorded in the date range.
     * @TODO we should either support sub queries or make a view for this
     * @param $membership_ip int
     * @param $start int unixtime
     * @param $end int unixtime
     */
    public static function MembershipByIdCount($membership_id, $start, $end) {
      $query = "
      SELECT COUNT(*) FROM (
        SELECT P.user_id, P.membership_id, COUNT(*) as c, MIN(P.date) as min, MAX(P.date) as max
        FROM payments AS P
        WHERE
        P.status=1
        GROUP BY P.user_id, P.membership_id
      ) AS PV WHERE
      PV.membership_id=%s AND PV.max >= '%s' AND PV.max <= '%s';";
      $result = Database::arbitrary(sprintf($query, $membership_id, date('Y-m-d 00:00:00', $start), date('Y-m-d 23:59:59', $end)));
      
      if (count($result) > 0) {
        return $result[0][0];
      }
      
      return 0;
    }
}