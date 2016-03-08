CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `event` varchar(255) NOT NULL,
  `description` TEXT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1;

CREATE TABLE `eventprivileges` (
  `eventid` int(11),
  `privilegeid` int(11),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text null,
  FOREIGN KEY (`eventid`) REFERENCES `events`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`privilegeid`) REFERENCES `privileges`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`eventid`, `privilegeid`)
) ENGINE=MyISAM;

CREATE TABLE `webhooks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` TEXT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `userid` int(11) NULL,
  `url` varchar(255) NOT NULL,
  `translation` TEXT NULL,
  `headers` TEXT NULL,
  `method` varchar(32) NOT NULL,
  `eventid` int(11) NOT NULL,
  FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`eventid`) REFERENCES `events`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1;

CREATE TABLE `webhookprivileges` (
  `webhookid` int(11),
  `privilegeid` int(11),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text null,
  FOREIGN KEY (`webhookid`) REFERENCES `webhooks`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`privilegeid`) REFERENCES `privileges`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`webhookid`, `privilegeid`)
) ENGINE=MyISAM;
