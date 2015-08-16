CREATE TABLE IF NOT EXISTS `ipnrequest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  `validation` varchar(255) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `payment_amount` varchar(255) NOT NULL,
  `payment_currency` varchar(255) NOT NULL,
  `payer_email`  varchar(255) NOT NULL,
  `item_name`  varchar(255) NOT NULL,
  `item_number`  varchar(255) NOT NULL,
  `raw` TEXT,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1 ;