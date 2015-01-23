UPDATE `privileges` SET `name` ='Vetted for Keyholder', `description` = 'Member has been vetted for keyholder membership level' WHERE `code` = 'vetted';

INSERT INTO `userprivileges` (`userid`, `privilegeid`, `notes`) SELECT `userid`, (SELECT `id` FROM `privileges` WHERE `code` = 'vetted') as `privilegeid`, 'Added by migration 8' as `notes` FROM `users` WHERE `membership_id` = (SELECT `id` FROM `memberships` WHERE `code` = 'key-holder');

ALTER TABLE `users` DROP COLUMN `vetted`;