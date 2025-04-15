<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 1:29 PM.
 */

namespace vhs\database\engines\mysql;

use vhs\database\ConnectionInfo;

/** @typescript */
class MySqlConnectionInfo extends ConnectionInfo {
    /**
     * database.
     *
     * @var string
     */
    private $database;

    /**
     * password.
     *
     * @var string
     */
    private $password;

    /**
     * server.
     *
     * @var string
     */
    private $server;

    /**
     * username.
     *
     * @var string
     */
    private $username;

    /**
     * __construct.
     *
     * @param string $server
     * @param string $username
     * @param string $password
     * @param string $database
     *
     * @return void
     */
    public function __construct($server, $username, $password, $database = null) {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        //TODO throw argument exceptions here if shit is rotten
    }

    /**
     * getDatabase.
     *
     * @return string
     */
    public function getDatabase() {
        return $this->database;
    }

    /**
     * getDetails.
     *
     * @return array{server:string,username:string,password:string,database:string}
     */
    public function getDetails() {
        return [
            'server' => $this->server,
            'username' => $this->username,
            'password' => $this->password,
            'database' => $this->database
        ];
    }

    /**
     * getPassword.
     *
     * @return string
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * getServer.
     *
     * @return string
     */
    public function getServer() {
        return $this->server;
    }

    /**
     * getUsername.
     *
     * @return string
     */
    public function getUsername() {
        return $this->username;
    }
}
