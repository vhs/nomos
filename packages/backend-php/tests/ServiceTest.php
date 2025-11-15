<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 11:02 AM.
 */

use PHPUnit\Framework\TestCase;
use tests\security\PermPrincipal;
use vhs\services\ServiceClient;
use vhs\services\ServiceRegistry;

/** @typescript */
class ServiceTest extends TestCase {
    /**
     * test_AllPermMethod.
     *
     * @return void
     */
    public function test_AllPermMethod() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1', 'perm2', 'perm3'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AllPermMethod!', ServiceClient::web_TestService1_AllPermMethod());
    }

    /**
     * test_AllPermMethod_authedOnly.
     *
     * @return void
     */
    public function test_AllPermMethod_authedOnly() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_AllPermMethod();
    }

    /**
     * test_AllPermMethod_missingPerm2.
     *
     * @return void
     */
    public function test_AllPermMethod_missingPerm2() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1', 'perm3'));

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_AllPermMethod();
    }

    /**
     * test_AllPermMethod_missingPerm3.
     *
     * @return void
     */
    public function test_AllPermMethod_missingPerm3() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1', 'perm2'));

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_AllPermMethod();
    }

    /**
     * test_AnonMethod_asAnon.
     *
     * @return void
     */
    public function test_AnonMethod_asAnon() {
        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('randomPermission'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnonMethod!', ServiceClient::web_TestService1_AnonMethod());
    }

    /**
     * test_AnyPermMethod.
     *
     * @return void
     */
    public function test_AnyPermMethod() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm2'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm3'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1', 'perm2'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm2', 'perm3'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1', 'perm2', 'perm3'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AnyPermMethod!', ServiceClient::web_TestService1_AnyPermMethod());
    }

    /**
     * test_AnyPermMethod_authedOnly.
     *
     * @return void
     */
    public function test_AnyPermMethod_authedOnly() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_AnyPermMethod();
    }

    /**
     * test_AnyPermMethod_wrongSet.
     *
     * @return void
     */
    public function test_AnyPermMethod_wrongSet() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('asdf', 'zxcv'));

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_AnyPermMethod();
    }

    /**
     * test_ArgMethod_asAnon.
     *
     * @return void
     */
    public function test_ArgMethod_asAnon() {
        // $data = '{ "a": "hello ", "b": "world" }';

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('ArgMethod: hello world', ServiceClient::web_TestService1_ArgMethod('hello ', 'world'));
    }

    /**
     * test_AuthMethod_asAnon.
     *
     * @return void
     */
    public function test_AuthMethod_asAnon() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_AuthMethod();
    }

    /**
     * test_AuthMethod_asAuth.
     *
     * @return void
     */
    public function test_AuthMethod_asAuth() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AuthMethod!', ServiceClient::web_TestService1_AuthMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('randomPermission'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('AuthMethod!', ServiceClient::web_TestService1_AuthMethod());
    }

    /**
     * test_EmptyPermMethod_asAnon.
     *
     * @return void
     */
    public function test_EmptyPermMethod_asAnon() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Service contract method requires permission context.');

        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_EmptyPermMethod();
    }

    /**
     * test_MissingPermMethod_asAnon.
     *
     * @return void
     */
    public function test_MissingPermMethod_asAnon() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Service contract method requires permission context.');

        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_MissingPermMethod();
    }

    /**
     * test_MultiPermMethod.
     *
     * @return void
     */
    public function test_MultiPermMethod() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1', 'perm2'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('MultiPermMethod!', ServiceClient::web_TestService1_MultiPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm2', 'perm3'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('MultiPermMethod!', ServiceClient::web_TestService1_MultiPermMethod());

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('perm1', 'perm2', 'perm3'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('MultiPermMethod!', ServiceClient::web_TestService1_MultiPermMethod());
    }

    /**
     * test_native_ArgMethod_asAnon.
     *
     * @return void
     */
    public function test_native_ArgMethod_asAnon() {
        $data = [
            'a' => 'hello ',
            'b' => 'world'
        ];

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('ArgMethod: hello world', ServiceClient::native_TestService1_ArgMethod('hello ', 'world'));
        //ServiceRegistry::get("native")->handle("/services/native/TestService1.svc/ArgMethod", $data));
    }

    /**
     * test_NoDocMethod_asAnon.
     *
     * @return void
     */
    public function test_NoDocMethod_asAnon() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Service contract method requires permission context.');

        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_NoDocMethod();
    }

    /**
     * test_ObjReturnMethod_asAnon.
     *
     * @return void
     */
    public function test_ObjReturnMethod_asAnon() {
        $data = '{ "a": "hello " }';

        $this->assertEquals('{"retA":"hello "}', ServiceRegistry::get('web')->handle('/services/web/TestService1.svc/ObjReturnMethod', $data));
    }

    /**
     * test_PermMethod_asAnon.
     *
     * @return void
     */
    public function test_PermMethod_asAnon() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        $this->assertTrue(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_PermMethod();
    }

    /**
     * test_PermMethod_asAuth.
     *
     * @return void
     */
    public function test_PermMethod_asAuth() {
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Access denied');

        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal());

        $this->assertFalse(\vhs\security\CurrentUser::getPrincipal()->isAnon());

        // @phpstan-ignore staticMethod.notFound
        ServiceClient::web_TestService1_PermMethod();
    }

    /**
     * test_PermMethod_asPerm.
     *
     * @return void
     */
    public function test_PermMethod_asPerm() {
        \vhs\security\CurrentUser::setPrincipal(new PermPrincipal('randomPermission'));

        // @phpstan-ignore staticMethod.notFound
        $this->assertEquals('PermMethod!', ServiceClient::web_TestService1_PermMethod());
    }

    /**
     * setUpBeforeClass.
     *
     * @return void
     */
    public static function setUpBeforeClass(): void {
        $logger = new \vhs\loggers\SilentLogger();

        ServiceRegistry::register($logger, 'web', 'tests\\endpoints\\web', \vhs\BasePath::getBasePath(false));
        ServiceRegistry::register($logger, 'native', 'tests\\endpoints\\native', \vhs\BasePath::getBasePath(false));
    }

    /**
     * tearDownAfterClass.
     *
     * @return void
     */
    public static function tearDownAfterClass(): void {
    }

    /**
     * setUp.
     *
     * @return void
     */
    protected function setUp(): void {
    }

    /**
     * tearDown.
     *
     * @return void
     */
    protected function tearDown(): void {
        \vhs\security\CurrentUser::setPrincipal(new \vhs\security\AnonPrincipal());
    }
}
