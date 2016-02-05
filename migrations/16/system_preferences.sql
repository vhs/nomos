CREATE TABLE `systempreferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` TEXT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `notes` TEXT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1;

CREATE TABLE `systempreferenceprivileges` (
  `systempreferenceid` int(11),
  `privilegeid` int(11),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text null,
  FOREIGN KEY (`systempreferenceid`) REFERENCES `systempreferences`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`privilegeid`) REFERENCES `privileges`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`systempreferenceid`, `privilegeid`)
) ENGINE=MyISAM;
