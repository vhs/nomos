<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 4:29 PM
 */

require_once 'vendor/autoload.php';
require_once 'vhs/vhs.php';

\vhs\SplClassLoader::getInstance()->add(new \vhs\SplClassLoaderItem('tests', dirname(__FILE__) . '/..'));
\vhs\SplClassLoader::getInstance()->add(new \vhs\SplClassLoaderItem('app', dirname(__FILE__) . '/..'));
