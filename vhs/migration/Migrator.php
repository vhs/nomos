<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 12:57 PM.
 */

namespace vhs\migration;

use vhs\Logger;
use vhs\loggers\SilentLogger;

/** @typescript */
class Migrator {
    private $database;
    private $logger;
    private $password;
    private $server;
    private $user;

    public function __construct($server, $user, $password, $database, Logger $logger = null) {
        $this->server = $server;
        $this->user = $user;
        $this->password = $password;
        $this->database = $database;

        if (is_null($logger)) {
            $this->logger = new SilentLogger();
        } else {
            $this->logger = $logger;
        }
    }

    public function migrate($toVersion = null, $migrationsPath = '.') {
        $this->logger->log('Starting migration');

        $conn = new \mysqli($this->server, $this->user, $this->password);

        if ($conn->connect_error) {
            $this->logger->log('Connection failed: ' . $conn->connect_error);

            return false;
        }

        $sql = "CREATE DATABASE IF NOT EXISTS {$this->database};";
        if ($conn->query($sql) === true) {
            $this->logger->log('Database created successfully');
        } else {
            $this->logger->log('Error creating database: ' . $conn->error);

            return false;
        }

        $conn->select_db($this->database);

        $currentversion = 0;

        if ($conn->query("SHOW TABLES LIKE 'settings'")->num_rows == 1) {
            if ($conn->query("SHOW COLUMNS FROM `settings` LIKE 'schemaversion'")->num_rows == 1) {
                $currentversion = intval($conn->query('SELECT schemaversion FROM settings')->fetch_row()[0]);
            } else {
                $currentversion = 1;
            }
        }

        $versions = array_values(array_diff(scandir($migrationsPath, SCANDIR_SORT_ASCENDING), ['..', '.']));
        sort($versions, SORT_NUMERIC);

        $this->logger->log('Current: ' . $currentversion);
        $this->logger->log('Latest: ' . $versions[sizeof($versions) - 1]);

        if (!is_null($toVersion)) {
            $this->logger->log('Target: ' . $toVersion);

            if ($toVersion > $versions[sizeof($versions) - 1]) {
                $this->logger->log('Cannot target a version higher than latest.');

                return false;
            }

            if ($toVersion <= $currentversion) {
                $this->logger->log('Target must be higher than current.');

                return false;
            }
        }

        if ($currentversion == $versions[sizeof($versions) - 1]) {
            $this->logger->log('Already up to date.');

            return true;
        }

        foreach ($versions as $version) {
            if (!is_null($toVersion)) {
                if ($currentversion >= $toVersion) {
                    break;
                }
            }

            if ($currentversion >= $version) {
                continue;
            }

            //TODO these should prob be in a transaction to allow rollback in case a migration fails.
            $this->logger->log('Upgrading to: ' . $version);

            $scripts = array_values(array_diff(scandir($migrationsPath . '/' . $version, SCANDIR_SORT_ASCENDING), ['..', '.']));

            $script_path = $migrationsPath . '/' . $version . '/';

            $command = 'mysql -u' . DB_USER . ' -p' . DB_PASS . ' ' . '-h ' . DB_SERVER . ' -D ' . DB_DATABASE . " < {$script_path}";

            foreach ($scripts as $script) {
                $this->logger->log('Executing: ' . $script);

                try {
                    $output = shell_exec($command . $script);
                } catch (\Exception $e) {
                    $this->logger->log('Caught exception: ' . $e->getMessage() . "\n");

                    return false;
                }

                $this->logger->log('Output: ' . $output);
            }

            //this check is necessary if coming up from version 1
            if ($conn->query("SHOW COLUMNS FROM `settings` LIKE 'schemaversion'")->num_rows == 1) {
                $conn->query("UPDATE settings SET schemaversion = {$version}");
            }

            $currentversion = $version;

            $this->logger->log('Increased version: ' . $currentversion);
        }

        $this->logger->log('Up to date. Version: ' . $currentversion);

        $conn->close();

        return true;
    }
}
