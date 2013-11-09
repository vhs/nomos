<?php
  /**
   * Login
   *
   * @package Membership Manager Pro
   * @author wojoscripts.com
   * @copyright 2011
   * @version $Id: login.php, v2.50 2013-06-05 10:12:05 gewa Exp $
   */
  
  define("_VALID_PHP", true);
  require_once("../init.php");
?>
<?php
  if ($user->is_Admin())
      redirect_to("index.php");
	  
  if (isset($_POST['submit']))
      : $result = $user->login($_POST['username'], $_POST['password']);
  //Login successful 
  if ($result)
      : redirect_to("index.php");
  endif;
  endif;

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo $core->site_name;?></title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link href="../theme/css/login.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="../assets/js/jquery.js"></script>
<script type="text/javascript" src="../assets/js/jquery-ui.js"></script>
</head>
<body>
<div class="bgb">
  <div id="content">
    <header class="logintitle">
      <h1><i class="icon-lock icon-3x pull-left"></i> Admin Panel<span><?php echo $core->site_name;?></span></h1>
    </header>
    <div class="loginwrap">
      <form id="admin_form" name="admin_form" method="post" action="#" class="xform loginform">
        <section>
          <div class="row">
            <div class="col col-12">
              <label class="input"> <i class="icon-prepend icon-user"></i>
                <input placeholder="Username"  name="username">
              </label>
            </div>
          </div>
        </section>
        <section>
          <div class="row">
            <div class="col col-12">
              <label class="input"> <i class="icon-prepend icon-lock"></i>
                <input placeholder="**********" type="password" name="password">
              </label>
            </div>
          </div>
        </section>
        <footer>
          <button name="submit" class="button-login">Login</button>
        </footer>
      </form>
    </div>
    <div class="loginshadow"></div>
    <div id="footer">Copyright &copy;<?php echo date('Y').' '.$core->site_name;?></div>
    <div id="message-box"><?php print Filter::$showMsg;?></div>
  </div>
</div>
</body>
</html>