<?php

use vhs\loggers\ConsoleLogger;
use vhs\migration\Backup;
use vhs\migration\Migrator;

require_once(dirname(__FILE__) . "/../vhs/vhs.php");

define("_VALID_PHP", true);

require_once("../conf/config.ini.php");

$target_version = null;
$do_backup = null;
if(sizeof($argv) > 1 && !is_null($argv[1])) {
    foreach($argv as $arg) {
        if(is_numeric($arg))
            $target_version = intval($argv[1]);
        if($arg === 'b')
            $do_backup = 1;   
    }
}

$backup = new Backup(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE, new ConsoleLogger());
$migrator = new Migrator(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE, new ConsoleLogger());

if($do_backup) {
    if($backup->external_backup())
        print "Backup succeeded\n";
    else
        print "Backup failed\n";
}


if($migrator->migrate($target_version, "../migrations"))
    print "Migration succeeded\n";
else
    print "Migration failed\n";
