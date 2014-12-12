Run migrate.php from current directory or it'll mess up. i.e. change your shell to the path
 of the migrate.php file and run it as

 ~/migrations/> php migrate.php

If you don't have anything created yet, this will do it for you. The default admin account: vhs/password

If you're making any database schema changes, make a new folder
 with just a single integer +1 from the max. Put whatever
 scripts in there, they will get executed
 in SCANDIR_SORT_ASCENDING order.

This migration is assuming an offline migration, otherwise data loss could occur.

Read and understand the code in migrate.php before you run this tool. There's no rollbackise.
