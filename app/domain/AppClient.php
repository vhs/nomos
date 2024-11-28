<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 8/6/2016
 * Time: 1:11 PM
 */

namespace app\domain;

use app\schema\AppClientSchema;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class AppClient extends Domain {
    public static function Define() {
        AppClient::Schema(AppClientSchema::Type());
        AppClient::Relationship('owner', User::Type());
    }

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }
}
