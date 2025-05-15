<?php

namespace app\security\oauth\providers\slack;

use League\OAuth2\Client\Provider\ResourceOwnerInterface;

/** @typescript */
class SlackUser implements ResourceOwnerInterface {
    /**
     * response.
     *
     * @var array<string,mixed>
     */
    protected $response;

    /**
     * __construct.
     *
     * @param array<string,mixed> $response
     *
     * @return void
     */
    public function __construct(array $response) {
        $this->response = $response;
    }

    /**
     * getId.
     *
     * @return mixed
     */
    public function getId() {
        return $this->response['user_id'];
    }

    /**
     * getName.
     *
     * @return string
     */
    public function getName(): string {
        return $this->response['user'];
    }

    /**
     * toArray.
     *
     * @return array<string,mixed>
     */
    public function toArray() {
        return $this->response;
    }
}
