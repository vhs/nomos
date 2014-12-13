<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 3:28 PM
 */

use vhs\database\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationFailure;
use vhs\domain\validations\ValidationResults;

class ExampleDomain extends Domain {
    public static function getTable() { return 'example'; }
    public static function getPrimaryKeyColumn() { return 'id'; }
    public static function getColumns() { return array('testA', 'testB'); }

    public $testA;
    public $testB;

    public function validate(ValidationResults &$results) {
        if($this->testA != "pass")
            $results->add(new ValidationFailure("testA is not equal to pass"));
    }

    public static function findOnlyTheBest() {
        return self::arbitraryFind("SELECT * from example where testB = 'best'");
    }
}

class DomainTest extends PHPUnit_Framework_TestCase {

    private static $mySqlEngine;
    private static $inMemoryEngine;

    public static function setUpBeforeClass() {
        \vhs\database\Database::setLogger(new \vhs\loggers\ConsoleLogger());
        \vhs\database\Database::setRethrow(true);

        self::$mySqlEngine = new \vhs\database\engines\MySqlEngine(
            new \vhs\database\engines\MySqlConnectionInfo(
                DB_SERVER,
                DB_USER,
                DB_PASS,
                DB_DATABASE
            ), true
        );

        self::$inMemoryEngine = new \vhs\database\engines\InMemoryEngine();

        \vhs\database\Database::setEngine(self::$mySqlEngine);

    }

    public static function tearDownAfterClass() {
        \vhs\database\Database::setEngine(self::$mySqlEngine);

        \vhs\database\Database::arbitrary("DROP DATABASE " . DB_DATABASE);
    }

    protected function setUp() {
        \vhs\database\Database::setEngine(self::$mySqlEngine);
        \vhs\database\Database::arbitrary("CREATE TABLE example ( id int(11) not null auto_increment, testA varchar(255) null, testB varchar(255) null, PRIMARY  key (id));");
    }

    protected function tearDown() {
        \vhs\database\Database::setEngine(self::$mySqlEngine);
        \vhs\database\Database::arbitrary("DROP TABLE example;");
    }

    public function test_ObjectCreate() {
        \vhs\database\Database::setEngine(self::$mySqlEngine);
        $this->stuff();
    }

    public function test_InMemoryDomainTest() {
        \vhs\database\Database::setEngine(self::$inMemoryEngine);
        $this->stuff();
    }

    public function stuff() {
        $eg = new ExampleDomain();
        $eg->testA = "pass";
        $eg->testB = "fuck";

        $this->assertTrue($eg->save(), "save failed but prob through an exception.");

        $id = $eg->getId();

        $this->assertEquals($id, 1);

        unset($eg);

        $eg = ExampleDomain::find(1);

        $this->assertEquals($eg->testB, "fuck");

        $eg->delete();

        unset($eg);

        $eg = ExampleDomain::find(1);

        $this->assertNull($eg);

        $eg1 = new ExampleDomain();
        $eg1->testA = "pass";
        $eg1->testB = "eg1";
        $eg1->save();

        $eg2 = new ExampleDomain();
        $eg2->testA = "pass";
        $eg2->testB = "eg";
        $eg2->save();

        $eg3 = new ExampleDomain();
        $eg3->testA = "pass";
        $eg3->testB = "eg";
        $eg3->save();

        $records = ExampleDomain::where(Where::Equal("testB", "eg1"));

        $this->assertEquals(1, sizeof($records));
        $this->assertEquals("pass", $records[0]->testA);
        $this->assertEquals("eg1", $records[0]->testB);

        $records = ExampleDomain::where(Where::Equal("testB", "eg"));

        $this->assertEquals(2, sizeof($records));
        $this->assertEquals("pass", $records[0]->testA);
        $this->assertEquals("eg", $records[0]->testB);
        $this->assertEquals("pass", $records[1]->testA);
        $this->assertEquals("eg", $records[1]->testB);
    }
}
 