SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

INSERT IGNORE INTO `privileges` (name, description, code, enabled)
VALUES
    (
        'Edit Full Profile',
        'Permission to edit all profile fields',
        'full-profile',
        1
    );

INSERT IGNORE INTO `privileges` (name, description, code, enabled)
VALUES
    (
        'Web Hook Service',
        'Service privilege for webhooker',
        'webhook',
        1
    );

INSERT IGNORE INTO `privileges` (name, description, code, enabled)
VALUES
    (
        'OAuth Provider',
        'OAuth Provider Privilege',
        'oauth',
        1
    );

INSERT IGNORE INTO `privileges` (name, description, code, enabled)
VALUES
    (
        'Generate Temporary Pins',
        'This privilege would allow users to generate temporary pins.',
        'gen-temp-pin',
        0
    );

COMMIT;
