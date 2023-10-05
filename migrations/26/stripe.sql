ALTER TABLE `users` ADD COLUMN `stripe_id` VARCHAR(255) NULL;
ALTER TABLE `users` ADD COLUMN `stripe_email` VARCHAR(255) NULL;

CREATE TABLE IF NOT EXISTS `stripe_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  `status` varchar(255) NOT NULL,
  `created` int(11) NOT NULL,
  `event_id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `object` varchar(255) NOT NULL,
  `request` varchar(255) NOT NULL,
  `api_version` varchar(255) NOT NULL,
  `raw` TEXT,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 ;

ALTER TABLE `payments` MODIFY COLUMN `pp` enum('PayPal','MoneyBookers', 'Stripe') DEFAULT NULL;