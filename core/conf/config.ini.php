<?php 

    /** 
    * Database Constants - these constants refer to 
    * the database configuration settings. 
    */
    define('DB_SERVER', 'master'); 
    define('DB_USER', file_get_contents('/run/secrets/db_user'));
    define('DB_PASS', file_get_contents('/run/secrets/db_password'));
    define('DB_DATABASE', file_get_contents('/run/secrets/db_database'));

    define('NOMOS_FROM_EMAIL', file_get_contents('/run/secrets/from_email'));

    // SES is used to send e-mails
    define('AWS_SES_REGION', file_get_contents('/run/secrets/ses_region'));
    define('AWS_SES_CLIENT_ID', file_get_contents('/run/secrets/ses_clientid'));
    define('AWS_SES_SECRET', file_get_contents('/run/secrets/ses_secret'));

    // Add an application to github at https://github.com/settings/applications
    define('OAUTH_GITHUB_CLIENT', file_get_contents('/run/secrets/oauth_github_client'));
    define('OAUTH_GITHUB_SECRET', file_get_contents('/run/secrets/oauth_github_secret'));

    // Add an application at https://api.slack.com/applications
    define('OAUTH_SLACK_CLIENT', file_get_contents('/run/secrets/oauth_slack_client'));
    define('OAUTH_SLACK_SECRET', file_get_contents('/run/secrets/oauth_slack_secret'));
    define('OAUTH_SLACK_TEAM', file_get_contents('/run/secrets/oauth_slack_team'));

    // Add an application at https://console.developers.google.com/
    define('OAUTH_GOOGLE_CLIENT', file_get_contents('/run/secrets/oauth_google_client'));
    define('OAUTH_GOOGLE_SECRET', file_get_contents('/run/secrets/oauth_google_secret'));

    define('RABBITMQ_HOST', 'rabbitmq');
    define('RABBITMQ_PORT', '5672');
    define('RABBITMQ_USER', file_get_contents('/run/secrets/mq_user'));
    define('RABBITMQ_PASSWORD', file_get_contents('/run/secrets/mq_password'));
    define('RABBITMQ_VHOST', file_get_contents('/run/secrets/mq_vhost'));

    /** 
    * Show MySql Errors. 
    * Not recomended for live site. true/false 
    */
    define('DEBUG', false);
