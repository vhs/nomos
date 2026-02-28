<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:58 AM.
 */

namespace tests\services;

use tests\contracts\ITestService1;
use vhs\services\Service;

/** @typescript */
class TestService extends Service implements ITestService1 {
    /**
     * @permission perm1
     * @permission perm2
     * @permission perm3
     *
     * @return mixed
     */
    public function AllPermMethod() {
        return 'AllPermMethod!';
    }

    /**
     * @permission anonymous
     *
     * @return mixed
     */
    public function AnonMethod() {
        return 'AnonMethod!';
    }

    /**
     * @permission perm1|perm2|perm3
     *
     * @return mixed
     */
    public function AnyPermMethod() {
        return 'AnyPermMethod!';
    }

    /**
     * @permission anonymous
     *
     * @param mixed $a
     * @param mixed $b
     *
     * @return mixed
     */
    public function ArgMethod($a, $b) {
        return 'ArgMethod: ' . $a . $b;
    }

    /**
     * @permission user
     *
     * @return mixed
     */
    public function AuthMethod() {
        return 'AuthMethod!';
    }

    /**
     * @permission
     *
     * @return mixed
     */
    public function EmptyPermMethod() {
        return 'EmptyPermMethod!';
    }

    /**
     * @return mixed
     */
    public function MissingPermMethod() {
        return 'MissingPermMethod!';
    }

    /**
     * @permission perm1
     * @permission perm2
     *
     * @return mixed
     */
    public function MultiPermMethod() {
        return 'MultiPermMethod!';
    }

    /**
     * NoDocMethod.
     *
     * @return string
     */
    public function NoDocMethod(): string {
        return 'NoDocMethod!';
    }

    /**
     * @permission anonymous
     *
     * @param mixed $a
     *
     * @return mixed
     */
    public function ObjReturnMethod($a) {
        $data = [];

        $data['retA'] = $a;

        return $data;
    }

    /**
     * @permission randomPermission
     *
     * @return mixed
     */
    public function PermMethod() {
        return 'PermMethod!';
    }
}
