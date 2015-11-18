<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/18/2015
 * Time: 12:13 PM
 */

namespace app\security\oauth\modules;


use vhs\web\HttpRequestHandler;

abstract class OAuthHandler extends HttpRequestHandler
{
    public abstract function getUrl();
}
