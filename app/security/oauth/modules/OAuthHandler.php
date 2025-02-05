<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 12:13 PM.
 */

namespace app\security\oauth\modules;

use vhs\web\HttpRequestHandler;

/** @typescript */
abstract class OAuthHandler extends HttpRequestHandler {
    abstract public function getUrl();
}
