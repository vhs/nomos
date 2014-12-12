<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 4:29 PM
 */
define('_VALID_PHP', 1);
define('DEBUG', true);
define('DB_SERVER', 'localhost');
define('DB_USER', 'vhs_membership');
define('DB_PASS', '9fab3d41c56cc07962766f4ddda708e1');
define('DB_DATABASE', 'vhs_membership_test');

require_once("../tools/lib/Migrator.php");

require_once("../scripts/lib/class_db.php");

require_once("../scripts/lib/class_registry.php");

require_once("../scripts/lib/model/Domain.php");

require_once("TestBase.php");
