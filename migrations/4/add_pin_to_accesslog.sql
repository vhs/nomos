ALTER TABLE `accesslog` MODIFY `rfid_key` VARCHAR(64); -- need to make the rfid_key nullable
ALTER TABLE `accesslog` ADD `pin` VARCHAR(8) NULL;