<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 3:28 PM
 */

use PHPUnit\Framework\TestCase;
use vhs\database\constraints\Constraint;
use vhs\database\types\Type;
use vhs\database\wheres\Where;
use vhs\database\Table;
use vhs\domain\Domain;
use vhs\domain\Schema;
use vhs\domain\validations\ValidationFailure;
use vhs\domain\validations\ValidationResults;

class ExampleSchema extends Schema {
    /**
     * @return Table
     */
    public static function init() {
        $table = new Table('example', null);

        $table->addColumn('id', Type::Int());
        $table->addColumn('testA', Type::String(true));
        $table->addColumn('testB', Type::String(true));
        $table->addColumn('testC', Type::String(true));

        $table->setConstraints(Constraint::PrimaryKey($table->columns->id));

        return $table;
    }
}

class ExampleDomain extends Domain {
    public static function Define() {
        ExampleDomain::Schema(ExampleSchema::Type());
    }

    public function get_magic() {
        return 'magic field';
    }

    public function set_magic($value) {
        $this->testC = $value . 'magic';
    }

    public function get_testC() {
        return $this->internal_testC . 'fail';
    }

    public function set_testC($value) {
        $this->internal_testC = $value . 'pass';
    }

    public function validate(ValidationResults &$results) {
        if ($this->testA != 'pass') {
            $results->add(new ValidationFailure('testA is not equal to pass'));
        }
    }
}

class DomainTest extends TestCase {
    private static $logger;
    private static $mySqlEngine;
    private static $inMemoryEngine;

    public static function setUpBeforeClass() {
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

    public static function tearDownAfterClass() {
        //\vhs\database\Database::setEngine(self::$mySqlEngine);

        //\vhs\database\Database::arbitrary("DROP DATABASE " . DB_DATABASE);
    }

    protected function setUp() {
    }

    protected function tearDown() {
    }

    //public function test_ObjectCreate() {
    //\vhs\database\Database::setEngine(self::$mySqlEngine);
    //\vhs\database\Database::arbitrary("CREATE TABLE example ( id int(11) not null auto_increment, testA varchar(255) null, testB varchar(255) null, PRIMARY  key (id));");
    //$this->stuff();
    //\vhs\database\Database::arbitrary("DROP TABLE example;");
    //}

    public function test_InMemoryDomainTest() {
        \vhs\database\Database::setEngine(self::$inMemoryEngine);
        $this->stuff();
    }

    public function test_satelliteRelationship() {
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

        $sword = \tests\domain\Sword::find($swordid);

        $enchants = $sword->enchantments->all();

        $this->assertEquals(1, count($enchants));
        $this->assertEquals($enchantmentid, $enchants[$enchantmentid]->id);
        $this->assertEquals('Fire Enchantment', $enchants[$enchantmentid]->name);

        $sword->delete();
        $enchants[$enchantmentid]->delete();
    }

    public function test_parentRelationship() {
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

        $knight = \tests\domain\Knight::where(Where::Equal(\tests\domain\Knight::Schema()->Columns()->name, 'Black Knight'));

        $this->assertEquals(1, count($knight));

        $knight = $knight[0];

        $this->assertEquals($swordid, $knight->swordid);
        $this->assertNotNull($knight->sword);
        $this->assertEquals($swordid, $knight->sword->id);
        $this->assertEquals('Mighty Sword', $knight->sword->name);
    }

    public function test_childRelationship() {
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

        $knight = \tests\domain\Knight::find($knightid);

        $this->assertEquals(1, count($knight->rings->all()));
        $this->assertEquals('PIMP Ring', $knight->rings->all()[$ring->id]->name);
    }

    public function stuff() {
        $eg = new ExampleDomain();
        $eg->testA = 'pass';
        $eg->testB = 'fuck';

        $this->assertTrue($eg->save(), 'save failed but prob through an exception.');

        $this->assertEquals(1, $eg->id);

        unset($eg);

        $eg = ExampleDomain::find(['id' => 1]);

        $this->assertEquals('fuck', $eg->testB);

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
}
