<?php 
error_reporting(-1);
	/** 
	* door_access
	* 
	* @package Membership Manager Pro
	* @author wojoscripts.com
	* @copyright 2011
	* @version Id: door_access.php, v2.50 2014-09-04 22:07:42 gewa Exp $
	*/
 
	 define("_VALID_PHP", true); 
	 require_once("init.php");
 
?> 
 
 <?php include("header.php");


?> 
<style>
.spoiler {
	background: black;
	color: black;
	padding: 5px;
}

.spoiler:hover {
	color: white;
	background: black;
}

.doorinfo {
	background: white;
	
}
</style> 
	 <?php if($user->membership_id == 7): ?>
<div class="doorinfo fullform xform">
<header>
<h1>Welcome, <?=$user->name?>!</h1>.
<p>Congratulations on becoming a keyholder at VHS! This information is specific to you. In order to control access to our great new hackspace, please do not distribute this information to anyone else. If anyone asks for the code, please point them to one of the <a href="mailto:directors@lists.hackspace.ca">directors</a>.</p>
</header>
<h2>What you need to know:</h2>
<h3>Entry</h3>
<p>The code for the single door in the back of the space is <i class="spoiler">2716</i>. Enter this code, then turn the thumbturn toward the hinges. Once inside, you must deactivate the alarm. The alarm code is <i class="spoiler">7777</i>. Once you enter this, the alarm LED will turn off.</p>
<h3>Exit</h3>
<p>To arm the alarm, MAKE SURE THE SPACE IS EMPTY, then ensure the door is closed, and remain motionless.  Enter <i class="spoiler">7777</i> into the keypad, and the Alarm LED will turn red, and start beeping.  Turn the lights off and exit right away.  To lock the door after you have left, press the Schlage button on the top, then rotate the thumbturn away from the hinges.</p>
<p>Please test the door to confirmed that it is closed and locked properly.</p>
<p>For more info on opening and locking the space, see <a href="https://vancouver.hackspace.ca/doku.php?id=schalge_lock_instructions">the wiki page</a>.</p>
<p><b>Thanks!</b></p>
<p><i>The Membership Coordinator(s)</i></p>
</div>
 
	 <?php else: ?>
 
	 <h1>Hey! You're not a keyholder. If you've been a member for three months, you can become one, though.</h1>
 
	 <?php endif; ?>
 
 
 <?php include("footer.php");?> 
 
 
