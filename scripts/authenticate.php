<?php

use vhs\services\ServiceClient;

define("_VALID_PHP", true);
require_once("init.php");

if(isset($_GET['rfid'])) {
    $result = ServiceClient::web_AuthService1_CheckRfid($_GET['rfid']);

    if ($result->valid) die("AUTHORIZED");
}

if(isset($_GET['pin'])) {
    $result = ServiceClient::web_AuthService1_CheckPin($_GET['pin']);

    if ($result->valid) die("AUTHORIZED");
}

die("UNAUTHORIZED");
