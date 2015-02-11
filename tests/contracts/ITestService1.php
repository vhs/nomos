<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 10:55 AM
 */

namespace tests\contracts;


use vhs\services\IContract;

interface ITestService1 extends IContract {

    /**
     * @permission anonymous
     * @return mixed
     */
    public function AnonMethod();

    /**
     * @permission authenticated
     * @return mixed
     */
    public function AuthMethod();

    /**
     * @permission randomPermission
     * @return mixed
     */
    public function PermMethod();

    /**
     * @permission anonymous
     * @param $a
     * @param $b
     * @return mixed
     */
    public function ArgMethod($a, $b);

    /**
     * @permission anonymous
     * @param $a
     * @return mixed
     */
    public function ObjReturnMethod($a);

    /**
     * @return mixed
     */
    public function MissingPermMethod();

    /**
     * @permission
     * @return mixed
     */
    public function EmptyPermMethod();

    public function NoDocMethod();

    /**
     * @permission perm1|perm3
     * @permission perm2
     * @return mixed
     */
    public function MultiPermMethod();

    /**
     * @permission perm1|perm2|perm3
     * @return mixed
     */
    public function AnyPermMethod();

    /**
     * @permission perm1
     * @permission perm2
     * @permission perm3
     * @return mixed
     */
    public function AllPermMethod();
}