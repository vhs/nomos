<?php

/**
 * Database Constants - these constants refer to
 * the database configuration settings.
 */
define('DB_SERVER', 'localhost');
define('DB_USER', 'vhs');
define('DB_PASS', 'password');
define('DB_DATABASE', 'nomos');

define('NOMOS_FROM_EMAIL', 'membership@vanhack.ca');

// SES is used to send e-mails
define('AWS_SES_REGION', 'us-west-2');
define('AWS_SES_CLIENT_ID', '');
define('AWS_SES_SECRET', '');

// Add an application to github at https://github.com/settings/applications
define('OAUTH_GITHUB_CLIENT', '');
define('OAUTH_GITHUB_SECRET', '');

// Add an application at https://api.slack.com/applications
define('OAUTH_SLACK_CLIENT', '');
define('OAUTH_SLACK_SECRET', '');
define('OAUTH_SLACK_TEAM', '');

// Add an application at https://console.developers.google.com/
define('OAUTH_GOOGLE_CLIENT', '');
define('OAUTH_GOOGLE_SECRET', '');

// RabbitMQ settings
define('RABBITMQ_HOST', 'localhost');
define('RABBITMQ_PORT', '5672');
define('RABBITMQ_USER', 'nomos');
define('RABBITMQ_PASSWORD', 'password');
define('RABBITMQ_VHOST', 'nomos');

// Stripe settings
define('STRIPE_API_KEY', '');
define('STRIPE_WEBHOOK_SECRET', '');

// Stripe products
define('STRIPE_PRODUCTS', [
    'prod_EyhqiLcnWU81wv' => [
        'item_name' => 'VHS Keyholder Membership',
        'item_number' => 'vhs_membership_keyholder'
    ]
]);

/**
 * Show MySql Errors.
 * Not recomended for live site. true/false.
 */
define('DEBUG', defined('NOMOS_DEBUG'));
