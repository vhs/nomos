<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM.
 */

namespace app\domain;

use app\schema\IpnSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $created
 * @property string $validation
 * @property string $payment_status
 * @property string $payment_amount
 * @property string $payment_currency
 * @property string $payer_email
 * @property string $item_name
 * @property string $item_number
 * @property string $raw
 *
 * @extends Domain<Ipn>
 *
 * @typescript
 */
class Ipn extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        Ipn::Schema(IpnSchema::Type());
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
