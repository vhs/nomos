
INSERT INTO `privileges` (name, description, code, enabled) VALUES ('Inherits User Privileges', 'Used with user owned keys to inherit all the owner\'s privileges.', 'inherit', 1);
INSERT INTO `privileges` (name, description, code, enabled) VALUES ('PIN Authentication Service', 'Required to call CheckPin service for authenicating users with PIN codes.', 'pin-auth', 1);
INSERT INTO `privileges` (name, description, code, enabled) VALUES ('Administrator', 'Administrator level access', 'administrator', 1);

INSERT INTO `userprivileges` (`userid`, `privilegeid`, `notes`) SELECT `id` as `userid`, (SELECT `id` FROM `privileges` WHERE `code` = 'administrator') as `privilegeid`, 'Added by migration 9' as `notes` FROM `users` WHERE `userlevel` = 9;