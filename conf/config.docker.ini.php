<?php

require_once 'env.php';

/**
 * Database Constants - these constants refer to
 * the database configuration settings.
 */
define('DB_SERVER', NOMOS_DB_SERVER);
define('DB_USER', NOMOS_DB_USER);
define('DB_PASS', NOMOS_DB_PASSWORD);
define('DB_DATABASE', NOMOS_DB_DATABASE);

if (!defined('NOMOS_FROM_EMAIL')) {
    define('NOMOS_FROM_EMAIL', 'membership@vanhack.ca');
}

// SES is used to send e-mails
define('AWS_SES_REGION', 'us-west-2');
define('AWS_SES_CLIENT_ID', NOMOS_AWS_SES_CLIENT_ID);
define('AWS_SES_SECRET', NOMOS_AWS_SES_SECRET);

// Add an application to github at https://github.com/settings/applications
define('OAUTH_GITHUB_CLIENT', NOMOS_OAUTH_GITHUB_CLIENT);
define('OAUTH_GITHUB_SECRET', NOMOS_OAUTH_GITHUB_SECRET);

// Add an application at https://api.slack.com/applications
define('OAUTH_SLACK_CLIENT', NOMOS_OAUTH_SLACK_CLIENT);
define('OAUTH_SLACK_SECRET', NOMOS_OAUTH_SLACK_SECRET);
define('OAUTH_SLACK_TEAM', NOMOS_OAUTH_SLACK_TEAM);

// Add an application at https://console.developers.google.com/
define('OAUTH_GOOGLE_CLIENT', NOMOS_OAUTH_GOOGLE_CLIENT);
define('OAUTH_GOOGLE_SECRET', NOMOS_OAUTH_GOOGLE_SECRET);

define('RABBITMQ_HOST', NOMOS_RABBITMQ_HOST);
define('RABBITMQ_PORT', NOMOS_RABBITMQ_PORT);
define('RABBITMQ_USER', NOMOS_RABBITMQ_USER);
define('RABBITMQ_PASSWORD', NOMOS_RABBITMQ_PASSWORD);
define('RABBITMQ_VHOST', NOMOS_RABBITMQ_VHOST);

define('STRIPE_API_KEY', NOMOS_STRIPE_API_KEY);
define('STRIPE_WEBHOOK_SECRET', NOMOS_STRIPE_WEBHOOK_SECRET);
define('STRIPE_PRODUCTS', json_decode(NOMOS_STRIPE_PRODUCTS, true));

/**
 * Show MySql Errors.
 * Not recomended for live site. true/false.
 */
define('DEBUG', defined('NOMOS_DEBUG'));
