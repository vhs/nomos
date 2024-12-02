SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

UPDATE privileges
SET
    code = 'oauth-provider'
WHERE
    name = 'OAuth Provider';

COMMIT;
