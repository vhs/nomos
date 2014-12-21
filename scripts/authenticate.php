<?php

define("_VALID_PHP", true);
require_once("init.php");

if(isset($_GET['rfid'])) {
    $key = $db->escape($_GET['rfid']);

    if($RFID->auth($key) == 1) {
        die("AUTHORIZED");
    }
}

if(isset($_GET['pin']) && $PIN->auth($_GET['pin']) == 1) {
    die("AUTHORIZED");
}

die("UNAUTHORIZED");
