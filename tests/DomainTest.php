<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 3:28 PM.
 */

use PHPUnit\Framework\TestCase;
use tests\domain\ExampleDomain;
use tests\schema\ExampleSchema;
use vhs\database\wheres\Where;

/** @typescript */
class DomainTest extends TestCase {
    /**
     * inMemoryEngine.
     *
     * @var mixed
     */
    private static $inMemoryEngine;

    /**
     * $logger.
     *
     * @var \vhs\Logger
     */
    private static $logger;

    // private static $mySqlEngine;

    /**
     * stuff.
     *
     * @return void
     */
    public function stuff(): void {
        $eg = new ExampleDomain();

        $eg->testA = 'pass';
        $eg->testB = 'blimey';

        $this->assertTrue($eg->save(), 'save failed but prob through an exception.');

        $this->assertEquals(1, $eg->id);

        unset($eg);

        /** @var ExampleDomain */
        $eg = ExampleDomain::find(['id' => 1]);

        $this->assertEquals('blimey', $eg->testB);

        $eg->delete();

        unset($eg);

        $eg = ExampleDomain::find(['id' => 1]);

        $this->assertNull($eg);

        $eg1 = new ExampleDomain();
        $eg1->testA = 'pass';
        $eg1->testB = 'eg1';
        $eg1->save();

        $eg2 = new ExampleDomain();
        $eg2->testA = 'pass';
        $eg2->testB = 'eg';
        $eg2->save();

        $eg3 = new ExampleDomain();
        $eg3->testA = 'pass';
        $eg3->testB = 'eg';
        $eg3->save();

        /** @var ExampleDomain[] */
        $records = ExampleDomain::where(Where::Equal(ExampleSchema::Columns()->testB, 'eg1'));

        $this->assertEquals(1, sizeof($records));
        $this->assertEquals('pass', $records[0]->testA);
        $this->assertEquals('eg1', $records[0]->testB);
        $this->assertEquals('fail', $records[0]->testC);
        $this->assertEquals('magic field', $records[0]->magic);

        $records[0]->magic = 'super magical';

        $this->assertEquals('super magicalmagicpassfail', $records[0]->testC);

        $records = ExampleDomain::where(Where::Equal(ExampleSchema::Columns()->testB, 'eg'));

        $this->assertEquals(2, sizeof($records));
        $this->assertEquals('pass', $records[0]->testA);
        $this->assertEquals('eg', $records[0]->testB);
        $this->assertEquals('pass', $records[1]->testA);
        $this->assertEquals('eg', $records[1]->testB);
    }

    /**
     * test_childRelationship.
     *
     * @return void
     */
    public function test_childRelationship(): void {
        \vhs\database\Database::setEngine(self::$inMemoryEngine);

        $knight = new \tests\domain\Knight();
        $knight->name = 'Bling Knight';

        $ring = new \tests\domain\Ring();
        $ring->name = 'PIMP Ring';
        $ring->save();

        $knight->rings->add($ring);

        $knight->save();

        $knightid = $knight->id;

        unset($knight);

        /** @var \tests\domain\Knight */
        $knight = \tests\domain\Knight::find($knightid);

        $this->assertEquals(1, count($knight->rings->all()));
        $this->assertEquals('PIMP Ring', $knight->rings->all()[$ring->id]->name);
    }

    //public function test_ObjectCreate() {
    //\vhs\database\Database::setEngine(self::$mySqlEngine);
    //\vhs\database\Database::arbitrary("CREATE TABLE example ( id int(11) not null auto_increment, testA varchar(255) null, testB varchar(255) null, PRIMARY  key (id));");
    //$this->stuff();
    //\vhs\database\Database::arbitrary("DROP TABLE example;");
    //}

    /**
     * test_InMemoryDomainTest.
     *
     * @return void
     */
    public function test_InMemoryDomainTest(): void {
        \vhs\database\Database::setEngine(self::$inMemoryEngine);
        $this->stuff();
    }

    /**
     * test_parentRelationship.
     *
     * @return void
     */
    public function test_parentRelationship(): void {
        \vhs\database\Database::setEngine(self::$inMemoryEngine);

        $sword = new \tests\domain\Sword();
        $sword->name = 'Mighty Sword';
        $sword->damage = 20;
        $sword->save();

        $swordid = $sword->id;

        $knight = new \tests\domain\Knight();
        $knight->name = 'Black Knight';
        $knight->sword = $sword;
        $knight->save();

        $knightid = $knight->id;

        unset($knight);

        $knight = \tests\domain\Knight::where(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Where::Equal(\tests\domain\Knight::Schema()->Columns()->name, 'Black Knight')
        );

        $this->assertEquals(1, count($knight));

        $knight = $knight[0];

        $this->assertEquals($swordid, $knight->swordid);
        $this->assertNotNull($knight->sword);
        $this->assertEquals($swordid, $knight->sword->id);
        $this->assertEquals('Mighty Sword', $knight->sword->name);
    }

    /**
     * test_satelliteRelationship.
     *
     * @return void
     */
    public function test_satelliteRelationship(): void {
        \vhs\database\Database::setEngine(self::$inMemoryEngine);

        $enchantment = new \tests\domain\Enchantment();
        $enchantment->name = 'Fire Enchantment';
        $enchantment->bonus = 1.5;
        $enchantment->save();

        $sword = new \tests\domain\Sword();
        $sword->name = 'Flaming Sword';
        $sword->damage = 20;
        $sword->enchantments->add($enchantment);
        $sword->save();

        $enchantmentid = $enchantment->id;
        $swordid = $sword->id;

        unset($enchantment, $sword);

        /** @var \tests\domain\Sword */
        $sword = \tests\domain\Sword::find($swordid);

        $enchants = $sword->enchantments->all();

        $this->assertEquals(1, count($enchants));
        $this->assertEquals($enchantmentid, $enchants[$enchantmentid]->id);
        $this->assertEquals('Fire Enchantment', $enchants[$enchantmentid]->name);

        $sword->delete();
        $enchants[$enchantmentid]->delete();
    }

    /**
     * setUpBeforeClass.
     *
     * @return void
     */
    public static function setUpBeforeClass(): void {
        self::$logger = new \vhs\loggers\ConsoleLogger();
        self::$inMemoryEngine = new \vhs\database\engines\memory\InMemoryEngine();
        \vhs\database\Database::setLogger(self::$logger);
        \vhs\database\Database::setRethrow(true);

        /*
        self::$mySqlEngine = new \vhs\database\engines\mysql\MySqlEngine(
            new \vhs\database\engines\mysql\MySqlConnectionInfo(
                DB_SERVER,
                DB_USER,
                DB_PASS,
                DB_DATABASE
            ), true
        );

        self::$mySqlEngine->setLogger(self::$logger);
        */
        self::$inMemoryEngine->setLogger(self::$logger);

        \vhs\database\Database::setEngine(self::$inMemoryEngine);
    }

    /**
     * tearDownAfterClass.
     *
     * @return void
     */
    public static function tearDownAfterClass(): void {
        //\vhs\database\Database::setEngine(self::$mySqlEngine);

        //\vhs\database\Database::arbitrary("DROP DATABASE " . DB_DATABASE);
    }

    /**
     * setUp.
     *
     * @return void
     */
    protected function setUp(): void {}

    /**
     * tearDown.
     *
     * @return void
     */
    protected function tearDown(): void {}
}
