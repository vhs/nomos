<?php

use app\domain\Key;
use app\domain\Membership;
use app\domain\Privilege;
use app\domain\User;
use app\dto\UserActiveEnum;
use app\services\AuthService;
use PHPUnit\Framework\TestCase;
use vhs\database\Database;
use vhs\database\engines\memory\InMemoryEngine;
use vhs\Logger;
use vhs\loggers\ConsoleLogger;

/**
 * Created by PhpStorm.
 * User: thomas
 * Date: 24/02/16
 * Time: 10:17 AM.
 */
class KeyDomainTest extends TestCase {
    /** @var InMemoryEngine */
    private static $engine;
    /** @var Logger */
    private static $logger;

    private $ids = [];

    public function test_bullshitPhp() {
        $service = new AuthService();

        $result = $service->CheckPin('00011234');
        $obj = json_decode(json_encode($result));
        $this->assertTrue(is_array($obj->privileges), 'privileges must be an array');

        $user = User::find($this->ids['user']);
        $membership_privilege = Privilege::find($this->ids['membership_privilege']);

        $user->privileges->add($membership_privilege);
        $user->save();

        /*
         * This test is all about the array_unique issue in it converting arrays to
         * objects when they have conflicts. Consequently it would return an object
         * instead of an array when we had duplicate privileges on a user (e.g.
         * privilege on the user and a privilege inheritted from their membership)
         */

        $result2 = $service->CheckPin('00011234');
        $obj = json_decode(json_encode($result2));
        $this->assertTrue(is_array($obj->privileges), 'privileges must be an array');
    }

    public function test_Privileges() {
        $inherit = Privilege::find($this->ids['inherit']);
        $membership_privilege = Privilege::find($this->ids['membership_privilege']);
        $user_privilege = Privilege::find($this->ids['user_privilege']);

        $service = new AuthService();

        $result = $service->CheckPin('00011234');

        $this->assertArrayHasKey('valid', $result);
        $this->assertTrue(is_bool($result['valid']));
        $this->assertEquals(true, $result['valid']);

        $this->assertArrayHasKey('type', $result);
        $this->assertTrue(is_string($result['type']));
        $this->assertEquals('membership_code', $result['type']);

        $this->assertArrayHasKey('privileges', $result);
        $this->assertTrue(is_array($result['privileges']));
        $this->assertEquals(3, count($result['privileges']));

        $inheritFound = false;
        $membership_privilegeFound = false;
        $user_privilegeFound = false;

        foreach ($result['privileges'] as $priv) {
            if ($priv->code === $inherit->code) {
                $inheritFound = true;
            }
            if ($priv->code === $membership_privilege->code) {
                $membership_privilegeFound = true;
            }
            if ($priv->code === $user_privilege->code) {
                $user_privilegeFound = true;
            }
        }

        $this->assertTrue($inheritFound);
        $this->assertTrue($membership_privilegeFound);
        $this->assertTrue($user_privilegeFound);
    }

    public static function setUpBeforeClass(): void {
        self::$logger = new ConsoleLogger();
        self::$engine = new InMemoryEngine();
        self::$engine->setLogger(self::$logger);
        Database::setEngine(self::$engine);
        Database::setLogger(self::$logger);
        Database::setRethrow(true);
    }

    public static function tearDownAfterClass(): void {
        self::$engine->disconnect();
    }

    public function setUp(): void {
        $inherit = new Privilege();
        $inherit->name = 'Inherit Privilege';
        $inherit->code = 'inherit';
        $inherit->enabled = true;
        $inherit->save();

        $this->ids['inherit'] = $inherit->id;

        $membership_privilege = new Privilege();
        $membership_privilege->name = 'Membership Privilege';
        $membership_privilege->code = 'membership_privilege';
        $membership_privilege->enabled = true;
        $membership_privilege->save();

        $this->ids['membership_privilege'] = $membership_privilege->id;

        $user_privilege = new Privilege();
        $user_privilege->name = 'Membership Privilege';
        $user_privilege->code = 'membership_privilege';
        $user_privilege->enabled = true;
        $user_privilege->save();

        $this->ids['user_privilege'] = $user_privilege->id;

        $membership = new Membership();
        $membership->title = 'Membership Title';
        $membership->code = 'membership_code';
        $membership->active = true;
        $membership->privileges->add($membership_privilege);
        $membership->save();

        $this->ids['membership'] = $membership->id;

        $user = new User();
        $user->membership = $membership;
        $user->username = 'vbnm';
        $user->email = 'nomos_tests@vanhack.ca';
        $user->active = UserActiveEnum::ACTIVE->value;
        $user->privileges->add($user_privilege);
        $user_expiry = new DateTime('today');
        $user_expiry->modify('+1 month');
        $user->mem_expire = $user_expiry->format('Y-m-d H:i:s');
        $user->save();

        $this->ids['user'] = $user->id;

        $key = new Key();
        $key->userid = $user->id;
        $key->key = '0001|1234';
        $key->type = 'pin';
        $key->privileges->add($inherit);
        $key->save();

        $this->ids['key'] = $key->id;
    }

    public function tearDown(): void {
        self::$engine->disconnect();
    }
}
