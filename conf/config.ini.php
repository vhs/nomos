<?php
	/**
	 * Configuration

	 * @package Membership Manager Pro
	 * @author wojocms.com
	 * @copyright 2011
	 * @version Id: config.ini.php, v2.00 2011-04-20 10:12:05 gewa Exp $
	 */

	 if (!defined("_VALID_PHP"))
		 die('Direct access to this location is not allowed.');

	/**
	 * Database Constants - these constants refer to
	 * the database configuration settings.
	 */
	 define('DB_SERVER', 'localhost');
	 define('DB_USER', 'vhs_membership');
	 define('DB_PASS', '9fab3d41c56cc07962766f4ddda708e1');
	 define('DB_DATABASE', 'vhs_membership');

	/**
	 * Show MySql Errors.
	 * Not recomended for live site. true/false
	 */
	 define('DEBUG', true);
