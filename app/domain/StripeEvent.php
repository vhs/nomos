<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\domain;

use app\schema\StripeEventSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/** @typescript */
class StripeEvent extends Domain {
    public static function Define() {
        StripeEvent::Schema(StripeEventSchema::Type());
    }

    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
