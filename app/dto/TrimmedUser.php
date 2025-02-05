<?php

namespace app\dto;

use app\domain\Membership;
use app\domain\Privilege;

/** @typescript */
class TrimmedUser {
    public bool $active;
    public string $created;
    public string $email;
    public string $fname;
    public int $id;
    public string $lname;
    public Membership $membership;
    /** @var Privilege[] */
    public array $privileges;
    public string $username;

    public function __construct(array $userInfo) {
        $this->id = $userInfo['id'];
        $this->username = $userInfo['username'];
        $this->email = $userInfo['email'];
        $this->fname = $userInfo['fname'];
        $this->lname = $userInfo['lname'];
        $this->membership = $userInfo['membership'];
        $this->created = $userInfo['created'];
        $this->active = $userInfo['active'];
        $this->privileges = $userInfo['privileges'];
    }
}
