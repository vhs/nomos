<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:26 PM
 */

namespace app\domain;

use app\schema\PaymentSchema;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Payment extends Domain {
    public static function Define() {
        Payment::Schema(PaymentSchema::Type());
    }

    public static function exists($txn_id) {
        return Database::exists(
            Query::select(PaymentSchema::Table(), PaymentSchema::Columns(), Where::Equal(PaymentSchema::Columns()->txn_id, $txn_id))
        );
    }

    public function validate(ValidationResults &$results) {
    }
}
