INSERT INTO `privileges` (name, description, code, enabled)
VALUES ('Service Authentication', 'Allow for authentication from 3rd party services', 'service-auth', 1);

ALTER TABLE `keys` MODIFY `type` varchar(20) NULL;
