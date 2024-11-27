<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:58 AM
 */

namespace tests\services;

use tests\contracts\ITestService1;
use vhs\services\Service;

class TestService extends Service implements ITestService1 {
    /**
     * @permission anonymous
     * @return mixed
     */
    public function AnonMethod() {
        return 'AnonMethod!';
    }

    /**
     * @permission authenticated
     * @return mixed
     */
    public function AuthMethod() {
        return 'AuthMethod!';
    }

    /**
     * @permission randomPermission
     * @return mixed
     */
    public function PermMethod() {
        return 'PermMethod!';
    }

    /**
     * @permission anonymous
     * @param $a
     * @param $b
     * @return mixed
     */
    public function ArgMethod($a, $b) {
        return 'ArgMethod: ' . $a . $b;
    }

    /**
     * @permission anonymous
     * @param $a
     * @return mixed
     */
    public function ObjReturnMethod($a) {
        $data = [];

        $data['retA'] = $a;

        return $data;
    }

    /**
     * @return mixed
     */
    public function MissingPermMethod() {
        return 'MissingPermMethod!';
    }

    /**
     * @permission
     * @return mixed
     */
    public function EmptyPermMethod() {
        return 'EmptyPermMethod!';
    }

    public function NoDocMethod() {
        return 'NoDocMethod!';
    }

    /**
     * @permission perm1
     * @permission perm2
     * @return mixed
     */
    public function MultiPermMethod() {
        return 'MultiPermMethod!';
    }

    /**
     * @permission perm1|perm2|perm3
     * @return mixed
     */
    public function AnyPermMethod() {
        return 'AnyPermMethod!';
    }

    /**
     * @permission perm1
     * @permission perm2
     * @permission perm3
     * @return mixed
     */
    public function AllPermMethod() {
        return 'AllPermMethod!';
    }
}
