<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:56 PM.
 */

namespace app\security\credentials;

class PinCredentials extends TokenCredentials {
    public function getType() {
        return 'pin';
    }
}
