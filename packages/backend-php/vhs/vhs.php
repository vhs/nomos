<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:12 PM.
 */

require_once 'SplClassLoader.php';

define('INSTANCE_ID', uniqid());

\vhs\SplClassLoader::getInstance()->add(new \vhs\SplClassLoaderItem('vhs', dirname(__FILE__) . '/..'));
