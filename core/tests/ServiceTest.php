<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 11:02 AM
 */

use PHPUnit\Framework\TestCase;


use vhs\services\ServiceClient;
use \vhs\services\ServiceHandler;
use vhs\services\ServiceRegistry;

class PermPrincipal implements \vhs\security\IPrincipal {
    private $perms;

    public function __construct(...$perms) {
        if(is_null($perms))
            $perms = array();

        $this->perms = $perms;
    }

    public function hasAllPermissions(...$permission) { return (count(array_diff($permission, $this->perms)) == 0); }
    public function hasAnyPermissions(...$permission) { return (count(array_intersect($permission, $this->perms)) > 0); }
    public function getIdentity() { return null; }
    public function isAnon() { return false; }

    public function canGrantAllPermissions(...$permission)
    {
        // TODO: Implement canGrantAllPermissions() method.
    }

    public function canGrantAnyPermissions(...$permission)
    {
        // TODO: Implement canGrantAnyPermissions() method.
    }

    public function __toString()
    {
        return "perm";
    }
}

class ServiceTests extends TestCase {

    public static function setUpBeforeClass() {
        $logger = new \vhs\loggers\SilentLogger();
        ServiceRegistry::register($logger, "web", 'tests\\endpoints\\web', dirname(__FILE__) . '/..');
        ServiceRegistry::register($logger, "native", 'tests\\endpoints\\native', dirname(__FILE__) . '/..');
    }

    public static function tearDownAfterClass() {

    }

    protected function setUp() {

    }

    protected function tearDown() {
        \vhs\security\CurrentUser::setPrincipal(new \vhs\security\AnonPrincipal());
    }

    public function test_AnonMethod_asAnon() {
        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());
        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());

        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());
        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("randomPermission"));
        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_AuthMethod_asAnon() {

        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        ServiceClient::web_TestService1_AuthMethod();
    }

    public function test_AuthMethod_asAuth() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());
        $this->assertEquals('AuthMethod!', ServiceClient::web_TestService1_AuthMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("randomPermission"));
        $this->assertEquals('AuthMethod!', ServiceClient::web_TestService1_AuthMethod());
    }

    public function test_PermMethod_asPerm() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("randomPermission"));

        $this->assertEquals('PermMethod!', ServiceClient::web_TestService1_PermMethod());
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_PermMethod_asAuth() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());

        $this->assertFalse(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        ServiceClient::web_TestService1_PermMethod();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_PermMethod_asAnon() {
        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        ServiceClient::web_TestService1_PermMethod();
    }

    public function test_ArgMethod_asAnon() {
        //$data = '{ "a": "hello ", "b": "world" }';

        $this->assertEquals('ArgMethod: hello world', ServiceClient::web_TestService1_ArgMethod("hello ", "world"));
    }

    public function test_native_ArgMethod_asAnon() {
        $data = array(
            'a' => "hello ",
            'b' => "world"
        );

        $this->assertEquals('ArgMethod: hello world',
            ServiceClient::native_TestService1_ArgMethod("hello ", "world"));
            //ServiceRegistry::get("native")->handle("/services/native/TestService1.svc/ArgMethod", $data));
    }

    public function test_ObjReturnMethod_asAnon() {
        $data = '{ "a": "hello " }';

        $this->assertEquals('{"retA":"hello "}', ServiceRegistry::get("web")->handle("/services/web/TestService1.svc/ObjReturnMethod", $data));
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Service contract method requires permission context.
     */
    public function test_MissingPermMethod_asAnon() {
        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        ServiceClient::web_TestService1_MissingPermMethod();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Service contract method requires permission context.
     */
    public function test_EmptyPermMethod_asAnon() {
        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        ServiceClient::web_TestService1_EmptyPermMethod();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Service contract method requires permission context.
     */
    public function test_NoDocMethod_asAnon() {
        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        ServiceClient::web_TestService1_NoDocMethod();
    }

    public function test_MultiPermMethod() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1", "perm2"));
        $this->assertEquals('MultiPermMethod!', ServiceClient::web_TestService1_MultiPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm2", "perm3"));
        $this->assertEquals('MultiPermMethod!', ServiceClient::web_TestService1_MultiPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1", "perm2", "perm3"));
        $this->assertEquals('MultiPermMethod!', ServiceClient::web_TestService1_MultiPermMethod());
    }

    public function test_AnyPermMethod() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1"));
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm2"));
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm3"));
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1", "perm2"));
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm2", "perm3"));
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1", "perm2", "perm3"));
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_AnyPermMethod_authedOnly() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());
        ServiceClient::web_TestService1_AnyPermMethod();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_AnyPermMethod_wrongSet() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("asdf", "zxcv"));
        ServiceClient::web_TestService1_AnyPermMethod();
    }

    public function test_AllPermMethod() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1", "perm2", "perm3"));
        $this->assertEquals('AllPermMethod!', ServiceClient::web_TestService1_AllPermMethod());
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_AllPermMethod_missingPerm3() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1", "perm2"));
        ServiceClient::web_TestService1_AllPermMethod();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_AllPermMethod_missingPerm2() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal("perm1", "perm3"));
        ServiceClient::web_TestService1_AllPermMethod();
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Access denied
     */
    public function test_AllPermMethod_authedOnly() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());
        ServiceClient::web_TestService1_AllPermMethod();
    }
}
