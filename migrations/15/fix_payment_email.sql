UPDATE `users` SET `payment_email` = `email` WHERE `payment_email` IS NULL OR `payment_email` = '';

CREATE TABLE `multimailusers`
  SELECT
    o.`id` AS `org_id`,
    u.`id` AS `dupe_id`,
    o.`email` AS `org_email`,
    u.`email` AS `dupe_email`,
    o.`payment_email` AS `org_payment_email`,
    o.`mem_expire` AS `org_mem_expire`,
    u.`mem_expire` AS `dupe_mem_expire`
  FROM `users` o
    INNER JOIN `users` u
      ON o.`payment_email` = u.`email`
  WHERE o.`email` <> o.`payment_email`;

UPDATE `users` u, `multimailusers` m
SET u.`mem_expire` = m.`dupe_mem_expire` WHERE u.`id` = m.`org_id`;

UPDATE `payments` p, `multimailusers` m
SET p.`user_id` = m.`org_id` WHERE p.`user_id` = m.`dupe_id`;

UPDATE `keys` k, `multimailusers` m
SET k.`userid` = m.`org_id` WHERE k.`userid` = m.`dupe_id`;

UPDATE `genuinecard` g, `multimailusers` m
SET g.`userid` = m.`org_id` WHERE g.`userid` = m.`dupe_id`;

UPDATE `accesslog` a, `multimailusers` m
SET a.`userid` = m.`org_id` WHERE a.`userid` = m.`dupe_id`;

DELETE FROM `userprivileges` WHERE `userid` IN (SELECT `dupe_id` FROM `multimailusers`);
DELETE FROM `passwordresetrequests` WHERE `userid` IN (SELECT `dupe_id` FROM `multimailusers`);

DELETE FROM `users` WHERE `id` IN (SELECT `dupe_id` FROM `multimailusers`);

DROP TABLE `multimailusers`;
