<?php

namespace app\dto;

/** @typescript */
class UserPrincipal {
    /** @var int */
    public int $id;
    /** @var string[] */
    public array $permissions;

    public function __construct(array $userPrincipal) {
        $this->id = $userPrincipal['id'];
        $this->permissions = $userPrincipal['permissions'];
    }
}
