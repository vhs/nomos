<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:26 PM.
 */

namespace app\domain;

use app\schema\PaymentSchema;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int              $id
 * @property string           $txn_id
 * @property int              $membership_id
 * @property int              $user_id
 * @property string           $payer_email
 * @property string           $payer_fname
 * @property string           $payer_lname
 * @property float|int|string $rate_amount
 * @property string           $currency
 * @property string           $date
 * @property string           $pp
 * @property string           $ip
 * @property int              $status
 * @property string           $item_name
 * @property string           $item_number
 *
 * @extends Domain<Payment>
 *
 * @typescript
 */
class Payment extends Domain {
    /**
     * Define
     *
     * @return void
     */
    public static function Define(): void {
        Payment::Schema(PaymentSchema::Type());
    }

    /**
     * exists.
     *
     * @param string $txn_id
     *
     * @return bool
     */
    public static function exists($txn_id) {
        return Database::exists(
            Query::select(
                PaymentSchema::Table(),
                PaymentSchema::Columns(),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(PaymentSchema::Columns()->txn_id, $txn_id)
            )
        );
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
