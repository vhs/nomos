SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

ALTER TABLE `email_templates` ENGINE = InnoDB;

ALTER TABLE `eventprivileges` ENGINE = InnoDB;

ALTER TABLE `events` ENGINE = InnoDB;

ALTER TABLE `gateways` ENGINE = InnoDB;

ALTER TABLE `genuinecard` ENGINE = InnoDB;

ALTER TABLE `keyprivileges` ENGINE = InnoDB;

ALTER TABLE `keys` ENGINE = InnoDB;

ALTER TABLE `membershipprivileges` ENGINE = InnoDB;

ALTER TABLE `memberships` ENGINE = InnoDB;

ALTER TABLE `news` CHANGE `created` `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `news` ENGINE = InnoDB;

ALTER TABLE `passwordresetrequests` ENGINE = InnoDB;

ALTER TABLE `payments` ENGINE = InnoDB;

ALTER TABLE `privileges` ENGINE = InnoDB;

ALTER TABLE `settings` ENGINE = InnoDB;

ALTER TABLE `systempreferenceprivileges` ENGINE = InnoDB;

ALTER TABLE `systempreferences` ENGINE = InnoDB;

ALTER TABLE `userprivileges` ENGINE = InnoDB;

ALTER TABLE `users` ENGINE = InnoDB;

ALTER TABLE `webhookprivileges` ENGINE = InnoDB;

ALTER TABLE `webhooks` ENGINE = InnoDB;

COMMIT;
