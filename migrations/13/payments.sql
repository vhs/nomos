ALTER TABLE `payments` ADD COLUMN `payer_email` VARCHAR(255) NULL;
ALTER TABLE `payments` ADD COLUMN `payer_fname` VARCHAR(255) NULL;
ALTER TABLE `payments` ADD COLUMN `payer_lname` VARCHAR(255) NULL;

ALTER TABLE `payments` MODIFY COLUMN `user_id` INT(11) NULL;
ALTER TABLE `payments` MODIFY COLUMN `membership_id` INT(11) NULL;
