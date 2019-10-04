CREATE TABLE `userprivileges` (
  `userid` int(11),
  `privilegeid` int(11),
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  `notes` text null,
  FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`privilegeid`) REFERENCES `privileges`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`userid`, `privilegeid`)
) ENGINE=MyISAM;
