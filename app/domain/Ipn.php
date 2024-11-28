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

class Ipn extends Domain {
    public static function Define() {
        Ipn::Schema(IpnSchema::Type());
    }

    public function validate(ValidationResults &$results) {
    }
}
