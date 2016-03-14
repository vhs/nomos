Run migrate.php from current directory only.

There are database backup and migration options.

` ~/tools/> php migrate.php -m`

If you don't have anything created yet, this will create a current and mostly empty database for you. The default Nomos admin account: vhs/password

If you're making any database schema changes, make a new folder
 with just a single integer +1 from the max. Put whatever
 scripts in there, they will get executed
 in SCANDIR_SORT_ASCENDING order.

This migration is assuming an offline migration, otherwise data loss could occur.

Read and understand the code in migrate.php before you run this tool. There are rollbacksies, but it might not be pretty.

To migrate to a specific database first, include a parameter with the `-m` flag, e.g.:

` ~/tools/> php migrate.php -m5`


For backing up the database, use the `-b` flag, with an optional filename parameter. It will save in `~/tools/backup` with a unique filename (if none chosen).

` ~/tools/> php migrate.php -b`

` ~/tools/> php migrate.php -b"myawesomebackup.sql"`

Backup and migration options can be done with one command.


` ~/tools/> php migrate.php -b"test.sql" -m`

Backup operation is performed first.