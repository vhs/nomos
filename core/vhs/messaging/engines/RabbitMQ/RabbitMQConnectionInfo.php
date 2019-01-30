<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 3/3/2016
 * Time: 5:36 PM
 */

namespace vhs\messaging\engines\RabbitMQ;


use vhs\messaging\ConnectionInfo;

class RabbitMQConnectionInfo extends ConnectionInfo
{
    private $host;
    private $port;
    private $username;
    private $password;
    private $vhost;

    public function __construct($host, $port, $username, $password, $vhost = null) {
        $this->host = $host;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;
        $this->vhost = $vhost;

        //TODO throw argument exceptions here if shit is rotten
    }

    public function getDetails() {
        return array(
            "host" => $this->host,
            "port" => $this->port,
            "username" => $this->username,
            "password" => $this->password,
            "vhost" => $this->vhost
        );
    }

    public function getHost() { return $this->host; }
    public function getPort() { return $this->port; }
    public function getUsername() { return $this->username; }
    public function getPassword() { return $this->password; }
    public function getVHost() { return $this->vhost; }
}