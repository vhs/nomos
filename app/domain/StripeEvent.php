<?php

/**
 * Authors:
 * - Ty Eggen
 */

namespace app\domain;

use app\schema\StripeEventSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $ts
 * @property string $status
 * @property string $created
 * @property string $event_id
 * @property string $type
 * @property string $object
 * @property string $request
 * @property string $api_version
 * @property string $raw
 *
 *  @typescript
 */
class StripeEvent extends Domain {
    public static function Define() {
        StripeEvent::Schema(StripeEventSchema::Type());
    }

    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
