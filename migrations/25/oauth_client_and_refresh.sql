CREATE TABLE IF NOT EXISTS `refreshtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `userid` int(11) NOT NULL,
  `appclientid` int(11) NULL,
  `expires` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `appclient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `secret` varchar(255) NOT NULL,
  `userid` int(11) NOT NULL,
  `expires` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `redirecturi` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

ALTER TABLE `accesstoken` ADD COLUMN `appclientid` int(11) NULL;
