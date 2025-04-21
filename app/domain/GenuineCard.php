<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/20/2015
 * Time: 12:22 PM.
 */

namespace app\domain;

use app\schema\GenuineCardSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * @property int    $id
 * @property string $key
 * @property string $created
 * @property string $issued
 * @property bool   $active
 * @property int    $paymentid
 * @property int    $userid
 * @property string $owneremail
 * @property string $notes
 *
 * @extends Domain<GenuineCard>
 *
 * @typescript
 */
class GenuineCard extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        GenuineCard::Schema(GenuineCardSchema::Type());
    }

    /**
     * @param string $key
     *
     * @return GenuineCard[]
     */
    public static function findByKey($key) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return GenuineCard::where(Where::Equal(GenuineCardSchema::Columns()->key, $key));
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
