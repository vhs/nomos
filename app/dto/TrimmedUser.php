<?php

namespace app\dto;

use app\domain\Membership;
use app\domain\Privilege;
use app\domain\User;

/** @typescript */
class TrimmedUser {
    public string $active;
    public string $created;
    public string $email;
    public string $fname;
    public int $id;
    public string $lname;
    public object $membership;
    public object $privileges;
    public string $username;

    /**
     * constructor.
     *
     * @param \app\domain\User $userInfo
     */
    public function __construct(User $userInfo) {
        $this->id = $userInfo->id;
        $this->username = $userInfo->username;
        $this->email = $userInfo->email;
        $this->fname = $userInfo->fname;
        $this->lname = $userInfo->lname;
        $this->membership = $userInfo->membership;
        $this->created = $userInfo->created;
        $this->active = $userInfo->active;
        $this->privileges = $userInfo->privileges;
    }
}
