SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

ALTER TABLE `accesslog` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `accesstoken` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `appclient` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `email_templates` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `eventprivileges` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `events` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `gateways` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `genuinecard` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `ipnrequest` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `keyprivileges` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `keys` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `membershipprivileges` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `memberships` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `news` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `passwordresetrequests` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `payments` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `privileges` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `refreshtoken` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `settings` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `stripe_events` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `systempreferenceprivileges` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `systempreferences` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `userprivileges` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `users` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `webhookprivileges` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

ALTER TABLE `webhooks` CONVERT TO CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

COMMIT;
