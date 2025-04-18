<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:36 PM.
 */

namespace vhs\messaging\engines\RabbitMQ;

use vhs\messaging\ConnectionInfo;

/** @typescript */
class RabbitMQConnectionInfo extends ConnectionInfo {
    /**
     * host.
     *
     * @var string
     */
    private $host;

    /**
     * password.
     *
     * @var string
     */
    private $password;

    /**
     * port.
     *
     * @var int
     */
    private $port;

    /**
     * username.
     *
     * @var string
     */
    private $username;

    /**
     * vhost.
     *
     * @var string
     */
    private $vhost;

    /**
     * __construct.
     *
     * @param string $host
     * @param int    $port
     * @param string $username
     * @param string $password
     * @param string $vhost
     *
     * @return void
     */
    public function __construct($host, $port, $username, $password, $vhost = null) {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->vhost = $vhost;

        // TODO throw argument exceptions here if shit is rotten
    }

    /**
     * getDetails.
     *
     * @return array{host:string,port:int,username:string,password:string,vhost:string}
     */
    public function getDetails() {
        return [
            'host' => $this->host,
            'port' => $this->port,
            'username' => $this->username,
            'password' => $this->password,
            'vhost' => $this->vhost
        ];
    }

    /**
     * getHost.
     *
     * @return string
     */
    public function getHost() {
        return $this->host;
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
     * getPort.
     *
     * @return int
     */
    public function getPort() {
        return $this->port;
    }

    /**
     * getUsername.
     *
     * @return string
     */
    public function getUsername() {
        return $this->username;
    }

    /**
     * getVHost.
     *
     * @return string
     */
    public function getVHost() {
        return $this->vhost;
    }
}
