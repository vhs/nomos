<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 2:41 PM
 */

require_once("../vhs/vhs.php");

require_once("SplClassLoader.php");
echo dirname(__FILE__);
$classLoader = new SplClassLoader('app', dirname(__FILE__) . '\\..');
$classLoader->register();
