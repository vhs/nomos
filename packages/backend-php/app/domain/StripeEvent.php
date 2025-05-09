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
 * @extends Domain<StripeEvent>
 *
 *  @typescript
 */
class StripeEvent extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        StripeEvent::Schema(StripeEventSchema::Type());
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
