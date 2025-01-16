<?php

namespace app\security\oauth\providers\slack;

use League\OAuth2\Client\Provider\ResourceOwnerInterface;

class SlackUser implements ResourceOwnerInterface {
    protected $response;

    public function __construct(array $response) {
        $this->response = $response;
    }

    public function getId() {
        $this->response['user_id'];
    }

    public function getName(): string {
        return $this->response['user'];
    }

    public function toArray() {
        return $this->response;
    }
}
