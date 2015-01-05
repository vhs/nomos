<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 3:38 PM
 */

use vhs\services\ServiceHandler;

require_once("../vhs/vhs.php");

define('ROOT_NAMESPACE_PATH', dirname(__FILE__) . '\\..');

\vhs\SplClassLoader::getInstance()->add(new \vhs\SplClassLoaderItem('app', ROOT_NAMESPACE_PATH));

\vhs\services\ServiceRegistry::register("web", 'app\\endpoints\\web', ROOT_NAMESPACE_PATH);
\vhs\services\ServiceRegistry::register("native", 'app\\endpoints\\native', ROOT_NAMESPACE_PATH);
