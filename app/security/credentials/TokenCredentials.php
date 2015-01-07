<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 06/01/2015
 * Time: 3:24 PM
 */

namespace app\security\credentials;


use vhs\security\ICredentials;

class TokenCredentials implements ICredentials {

    private $token;

    public function __construct($token) {
        $this->token = $token;
    }

    public function getToken() { return $this->token; }
}