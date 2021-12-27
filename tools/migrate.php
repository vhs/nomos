<?php

use vhs\loggers\ConsoleLogger;
use vhs\migration\Backup;
use vhs\migration\Migrator;

require_once(dirname(__FILE__) . "/../vhs/vhs.php");

define("_VALID_PHP", true);

require_once("../conf/config.ini.php");

$target_version = null;
$do_migrate = null;
$backup_filename = null;
$do_backup = null;
$do_host = false;

//-b and -m flags, parameters optional
$options = getopt('b::m::t::');
if(isset($options['m'])) {
    if($options['m']) {
        $target_version = intval($options['m']);
    }
    $do_migrate = true; 
}
if(isset($options['b'])) {
    if($options['b']) {
        $backup_filename = $options['b'];
    }
    $do_backup = true;   
}
if(isset($options['t'])) {
    $do_host = true;
}

if($do_backup) {
    $backup = new Backup(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE, new ConsoleLogger());
    if($backup->external_backup($do_host, $backup_filename))
        print "Backup succeeded\n";
    else
        print "Backup failed\n";
}
if($do_migrate) {
    $migrator = new Migrator(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE, new ConsoleLogger());
    if($migrator->migrate($target_version, "../migrations"))
        print "Migration succeeded\n";
    else
        print "Migration failed\n";
}

