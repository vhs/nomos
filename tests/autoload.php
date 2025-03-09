<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 4:29 PM.
 */

require_once 'vendor/autoload.php';
require_once 'vhs/vhs.php';

define('DEBUG', false);

\vhs\SplClassLoader::getInstance()->add(new \vhs\SplClassLoaderItem('tests', \vhs\BasePath::getBasePath(false)));
\vhs\SplClassLoader::getInstance()->add(new \vhs\SplClassLoaderItem('app', \vhs\BasePath::getBasePath(false)));
