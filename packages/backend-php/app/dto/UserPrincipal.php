<?php

namespace app\dto;

use vhs\security\IPrincipal;

/** @typescript */
class UserPrincipal {
    /** @var int */
    public int $id;

    /** @var string[] */
    public array $permissions;

    /**
     * constructor.
     *
     * @param \vhs\security\IPrincipal $userPrincipal
     */
    public function __construct(IPrincipal $userPrincipal) {
        $this->id = $userPrincipal['id'];
        $this->permissions = $userPrincipal['permissions'];
    }
}
