<?php
use app\domain\Key;
use app\domain\Membership;
use app\domain\Privilege;
use app\domain\User;
use app\services\AuthService;
use vhs\database\Database;
use vhs\Logger;
use vhs\loggers\ConsoleLogger;

/**
 * Created by PhpStorm.
 * User: thomas
 * Date: 24/02/16
 * Time: 10:17 AM
 */
class KeyDomainTest extends PHPUnit_Framework_TestCase
{
    /** @var Logger */
    private static $logger;

    public static function setUpBeforeClass() {
        self::$logger = new ConsoleLogger();
        $engine = new \vhs\database\engines\memory\InMemoryEngine();
        $engine->setLogger(self::$logger);
        Database::setEngine($engine);
        Database::setLogger(self::$logger);
        Database::setRethrow(true);
    }

    public static function tearDownAfterClass() { }

    public function setUp()
    {

    }

    public function tearDown() { }

    public function test_Privileges()
    {
        $inherit = new Privilege();
        $inherit->name = "Inherit Privilege";
        $inherit->code = "inherit";
        $inherit->enabled = true;
        $inherit->save();

        $membership_privilege = new Privilege();
        $membership_privilege->name = "Membership Privilege";
        $membership_privilege->code = "membership_privilege";
        $membership_privilege->enabled = true;
        $membership_privilege->save();

        $user_privilege = new Privilege();
        $user_privilege->name = "Membership Privilege";
        $user_privilege->code = "membership_privilege";
        $user_privilege->enabled = true;
        $user_privilege->save();

        $membership = new Membership();
        $membership->title = "Membership Title";
        $membership->code = "membership_code";
        $membership->active = true;
        $membership->privileges->add($membership_privilege);
        $membership->save();

        $user = new User();
        $user->membership = $membership;
        $user->username = "vbnm";
        $user->email = "nomos_tests@hackspace.ca";
        $user->active = "y";
        $user->privileges->add($user_privilege);
        $user->save();

        $key = new Key();
        $key->userid = $user->id;
        $key->key = "0001|1234";
        $key->type = "pin";
        $key->privileges->add($inherit);
        $key->save();

        $service = new AuthService();

        $result = $service->CheckPin("00011234");

        $this->assertArrayHasKey("valid", $result);
        $this->assertTrue(is_bool($result["valid"]));
        $this->assertEquals(true, $result["valid"]);

        $this->assertArrayHasKey("type", $result);
        $this->assertTrue(is_string($result["type"]));
        $this->assertEquals("membership_code", $result["type"]);

        $this->assertArrayHasKey("privileges", $result);
        $this->assertTrue(is_array($result["privileges"]));
        $this->assertEquals(3, count($result["privileges"]));

        $inheritFound = false;
        $membership_privilegeFound = false;
        $user_privilegeFound = false;

        foreach($result["privileges"] as $priv) {
            if ($priv->code === $inherit->code) $inheritFound = true;
            if ($priv->code === $membership_privilege->code) $membership_privilegeFound = true;
            if ($priv->code === $user_privilege->code) $user_privilegeFound = true;
        }

        $this->assertTrue($inheritFound);
        $this->assertTrue($membership_privilegeFound);
        $this->assertTrue($user_privilegeFound);
    }
}
