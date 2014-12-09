<?php

define("_VALID_PHP", true);
define("DEBUG", true); //will create a warning because config.ini.php will try to define, no way around that currently.

require_once("../scripts/lib/config.ini.php");
require_once("../scripts/lib/class_db.php");
require_once("../scripts/lib/class_registry.php");

Registry::set('Database',new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE));
$db = Registry::get("Database");
$db->connect();

//ASSUMES THE DATABASE EXISTS

$currentversion = 0;

$val = $db->query("SHOW TABLES LIKE 'SETTINGS'");
print $db->numrows($val) . "\n\n";
if($db->numrows($val) == 1)
{
    $result = $db->query("SHOW COLUMNS FROM `settings` LIKE 'schemaversion'");
    if($db->numrows($result) == 1) {
        $currentversion = getValue("schemaversion", "settings", "1");
    } else {
        $currentversion = 1;
    }
}

$versions = array_values(array_diff(scandir(".", SCANDIR_SORT_ASCENDING), array('..', '.', 'migrate.php', 'README.txt')));

print "Current: " . $currentversion . "\n";
print "Latest: " . $versions[sizeof($versions) - 1] . "\n";

if ($currentversion == $versions[sizeof($versions) - 1]) { die("Up to date."); }

foreach($versions as $version) {
    if ($currentversion >= $version) continue;

    //TODO these should prob be in a transaction to allow rollback in case a migration fails.
    print "Upgrading to: " . $version . "\n";

    $scripts = array_values(array_diff(scandir("./" . $version, SCANDIR_SORT_ASCENDING), array('..', '.')));

    $script_path = "./" . $version . "/";

    $command = "mysql -u".DB_USER." -p".DB_PASS." "
        . "-h ".DB_SERVER." -D ".DB_DATABASE." < {$script_path}";

    foreach($scripts as $script) {

        print "Executing: " . $script . "\n";

        try {

            $output = shell_exec($command . $script);

        } catch (Exception $e) {
            die('Caught exception: ' .  $e->getMessage() . "\n");
        }

        print "Output: " . $output . "\n\n";

    }

    print "Increasing version: ";
    $db->update("settings", array("schemaversion" => $version));

    $currentversion = $version;

    print $currentversion . "\n";
}

print "Up to date. Version: " . $currentversion . "\n";