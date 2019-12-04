ALTER TABLE `users` ADD COLUMN `stripe_id` VARCHAR(255) NULL;

CREATE TABLE IF NOT EXISTS `stripeevents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `validation` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `objectid` varchar(255) NOT NULL,
  `raw` TEXT,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 ;

ALTER TABLE `payments` MODIFY COLUMN `pp` enum('PayPal','MoneyBookers', 'Stripe') DEFAULT NULL;
