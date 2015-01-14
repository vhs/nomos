<?php

use vhs\loggers\ConsoleLogger;
use vhs\migration\Migrator;

require_once(dirname(__FILE__) . "/../vhs/vhs.php");

define("_VALID_PHP", true);

require_once("../scripts/lib/config.ini.php");

$target_version = null;
if(sizeof($argv) > 1 && !is_null($argv[1]) && is_numeric($argv[1]))
    $target_version = intval($argv[1]);

$migrator = new Migrator(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE, new ConsoleLogger());

if($migrator->migrate($target_version, "../migrations"))
    print "Migration succeed\n";
else
    print "Migration failed\n";
