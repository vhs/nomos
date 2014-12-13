<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 08/12/2014
 * Time: 4:56 PM
 */

define("_VALID_PHP", 1);

require_once("../scripts/lib/config.ini.php");

require_once('../scripts/lib/password.php');

require_once("../scripts/lib/class_db.php");

require_once("../scripts/lib/class_registry.php");
Registry::set('Database',new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE));
$db = Registry::get("Database");
$db->connect();

require_once("../scripts/lib/vhs/domain/Domain.php");

session_start();

//$_SESSION['username'] = "asshole";

$eg = new \vhs\ExampleDomain();

$eg->testA = "pass";
$eg->testB = "fuck";
$eg->testC = "fuck";

try {
    $eg->save();
} catch (\vhs\ValidationException $ex) {
    var_dump($ex);
}


$eg->delete();



$all = \vhs\ExampleDomain::findAll();

foreach($all as $item)
    $item->delete();



?>

<b><pre><?php var_dump($eg); ?></pre></b>

Username: <input type="text" value="<?php print $_SESSION['username']; ?>" size="100" />
<br />
Password: <input type="text" value="<?php print password_hash(sha1("password"), PASSWORD_DEFAULT); ?>" size="100" />
<br />
<textarea rows="20" cols="80"><?php var_dump($_SESSION); ?></textarea>