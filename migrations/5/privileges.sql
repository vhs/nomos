CREATE TABLE `privileges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL,
  `description` TEXT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1;

INSERT INTO `privileges` (name, description, code, enabled) VALUES ('API Access', 'Member has API access.', 'vetted', 1);
INSERT INTO `privileges` (name, description, code, enabled) VALUES ('Door Access', 'Member has door access privileges', 'door', 1);
INSERT INTO `privileges` (name, description, code, enabled) VALUES ('Laser Access', 'Member has successfully completed Laser Certification Training', 'laser', 1);

CREATE TABLE `keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NULL,
  `type` enum('undefined', 'api', 'rfid', 'pin') NOT NULL DEFAULT 'undefined',
  `key` VARCHAR(255) NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text null,
  FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1;

ALTER TABLE `settings` ADD COLUMN `nextpinid` int(11) NOT NULL DEFAULT 0;

UPDATE `settings` SET `nextpinid` = (select max(pinid) + 1 from `users`);

INSERT INTO `keys` (`userid`, `type`, `key`, `notes`) SELECT u.id as `userid`, 'rfid' as `type`, u.rfid as `key`, 'Added by system migration v5' as `notes` from `users` u where u.rfid is not null;
INSERT INTO `keys` (`userid`, `type`, `key`, `notes`) SELECT u.id as `userid`, 'pin'  as `type`, CONCAT(u.pinid, '|', u.pin) as `key`, 'Added by system migration v5' as `notes` from `users` u where u.pin is not null;

DELIMITER $$
CREATE TRIGGER `upd_nextpinid` AFTER INSERT ON `keys`
FOR EACH ROW
  BEGIN
    IF NEW.type = 'pin' THEN BEGIN
      SET @nextpinid = (select `nextpinid` + 1 from `settings` limit 1);
      UPDATE `settings` SET `nextpinid` = @nextpinid;
    END; END IF;
  END;$$
DELIMITER ;

CREATE TABLE `keyprivileges` (
  `keyid` int(11),
  `privilegeid` int(11),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text null,
  FOREIGN KEY (`keyid`) REFERENCES `keys`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`privilegeid`) REFERENCES `privileges`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`keyid`, `privilegeid`)
) ENGINE=MyISAM;

INSERT INTO `keyprivileges` (`keyid`, `privilegeid`, `notes`) SELECT k.id as `keyid`, (select id from `privileges` where code = 'door') as `privilegeid`, 'Added by system migration v5' as `notes` from `keys` k where `type` = 'pin';

ALTER TABLE `memberships` ADD COLUMN `code` varchar(50) NOT NULL DEFAULT 'unknown';

UPDATE `memberships` SET `code` = LOWER(REPLACE(`title`, ' ', '-'));

CREATE TABLE `membershipprivileges` (
  `membershipid` int(11),
  `privilegeid` int(11),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text null,
  FOREIGN KEY (`membershipid`) REFERENCES `memberships`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`privilegeid`) REFERENCES `privileges`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`membershipid`, `privilegeid`)
) ENGINE=MyISAM;

INSERT INTO `membershipprivileges` (`membershipid`, `privilegeid`, `notes`) SELECT m.id as `keyid`, (select id from `privileges` where code = 'door') as `privilegeid`, 'Added by system migration v5' as `notes` from `memberships` m where `code` = 'key-holder';

ALTER TABLE users DROP COLUMN rfid;
ALTER TABLE users DROP COLUMN pinid;
ALTER TABLE users DROP COLUMN pin;
