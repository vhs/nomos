<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:41 PM
 */

require_once("include.php");

try {
    echo \vhs\services\ServiceRegistry::get("web")->handle($_SERVER["SCRIPT_NAME"], $_GET['json']);
} catch(\Exception $ex) {
    http_response_code(500);
    die($ex->getMessage());
}
