<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 08/12/2014
 * Time: 4:56 PM
 */

require_once('../scripts/lib/password.php');

session_start();

//$_SESSION['username'] = "asshole";

?>


Username: <input type="text" value="<?php print $_SESSION['username']; ?>" size="100" />
<br />
Password: <input type="text" value="<?php print password_hash(sha1("password"), PASSWORD_DEFAULT); ?>" size="100" />
<br />
<textarea rows="20" cols="80"><?php var_dump($_SESSION); ?></textarea>