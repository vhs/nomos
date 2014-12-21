<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:12 PM
 */
//echo realpath(dirname(__FILE__)) . "\n";
// Your custom class dir
//define('CLASS_DIR', realpath(dirname(__FILE__)) . "\\..");
//define('CLASS_DIR', "..");

// Add your class dir to include path
//echo CLASS_DIR . "\n";
//echo get_include_path() . "\n";
//set_include_path(get_include_path().PATH_SEPARATOR.CLASS_DIR);

//echo get_include_path() . "\n";

//spl_autoload_extensions(".php"); // comma-separated list
//spl_autoload_register(); //by default it will load with correctly named files/class names/namespaces

require_once("SplClassLoader.php");
echo dirname(__FILE__);
$classLoader = new SplClassLoader('vhs', dirname(__FILE__) . '\\..');
$classLoader->register();