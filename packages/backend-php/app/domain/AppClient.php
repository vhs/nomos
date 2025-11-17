<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 1:11 PM.
 */

namespace app\domain;

use app\schema\AppClientSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * AppClient domain implementation.
 *
 * @method static \app\domain\AppClient|null find(int $primaryKeyValues)
 *
 * @property int              $id
 * @property string           $secret
 * @property string           $expires
 * @property string           $name
 * @property int              $userid
 * @property \app\domain\User $owner
 * @property string           $description
 * @property string           $url
 * @property string           $redirecturi
 * @property bool             $enabled
 *
 * @extends Domain<AppClient>
 *
 * @typescript
 */
class AppClient extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        AppClient::Schema(AppClientSchema::Type());
        AppClient::Relationship('owner', User::Type());
    }

    /**
     * @param ValidationResults $results
     *
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }
}
