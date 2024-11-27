<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:29 PM
 */

namespace vhs\database\engines\mysql;

use vhs\database\ConnectionInfo;

class MySqlConnectionInfo extends ConnectionInfo {
    private $server;
    private $username;
    private $password;
    private $database;

    public function __construct($server, $username, $password, $database = null) {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        //TODO throw argument exceptions here if shit is rotten
    }

    public function getDetails() {
        return [
            'server' => $this->server,
            'username' => $this->username,
            'password' => $this->password,
            'database' => $this->database
        ];
    }

    public function getServer() {
        return $this->server;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getDatabase() {
        return $this->database;
    }
}
