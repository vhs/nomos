<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:53 PM
 */

use vhs\database\Database;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\database\wheres\Where;
use vhs\domain\Schema;
use vhs\Logger;
use vhs\loggers\ConsoleLogger;

class TestSchema extends Schema {
    public function __construct() {
        $table = new Table("test");
        $table->addColumn("test1", Type::String());
        $table->addColumn("test3", Type::String());
        $table->addColumn("test5", Type::String());

        parent::__construct($table);
    }
}

class WhereTests extends PHPUnit_Framework_TestCase {

    /** @var Logger */
    private static $logger;

    public static function setUpBeforeClass() {
        self::$logger = new ConsoleLogger();
        Database::setLogger(self::$logger);
        Database::setEngine(new \vhs\database\engines\memory\InMemoryEngine());
        Database::setRethrow(true);
    }

    public static function tearDownAfterClass() { }

    private $mySqlGenerator;
    private $inMemoryGenerator;

    public function setUp() {
        $this->mySqlGenerator = new \vhs\database\engines\mysql\MySqlWhereGenerator();
        $this->inMemoryGenerator = new \vhs\database\engines\memory\InMemoryWhereGenerator();
    }
    public function tearDown() { }

    public function test_Equal() {
        $where = Where::Equal(TestSchema::Column("test1"), "test2");

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 = 'test2'", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => "test2");
        $data2 = array("test1" => "test3");

        $this->assertTrue($clause($data1));
        $this->assertFalse($clause($data2));
    }

    public function test_NotEqual() {
        $where = Where::NotEqual(TestSchema::Column("test1"), "test2");

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 <> 'test2'", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => "test2");
        $data2 = array("test1" => "test3");

        $this->assertFalse($clause($data1));
        $this->assertTrue($clause($data2));
    }

    public function test_Null() {
        $where = Where::Null(TestSchema::Column("test1"));

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 IS NULL", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => null);
        $data2 = array("test1" => "test3");

        $this->assertTrue($clause($data1), "failed to null match null");
        $this->assertFalse($clause($data2), "failed by matching 'test3' as null");
    }

    public function test_NotNull() {
        $where = Where::NotNull(TestSchema::Column("test1"));

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 IS NOT NULL", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => null);
        $data2 = array("test1" => "test3");

        $this->assertFalse($clause($data1));
        $this->assertTrue($clause($data2));
    }

    public function test_In() {
        $where = Where::In(TestSchema::Column("test1"), array("a","b","c"));

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 IN ('a', 'b', 'c')", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => "a");
        $data2 = array("test1" => "b");
        $data3 = array("test1" => "c");
        $data4 = array("test1" => "d");

        $this->assertTrue($clause($data1));
        $this->assertTrue($clause($data2));
        $this->assertTrue($clause($data3));
        $this->assertFalse($clause($data4));
    }

    public function test_NotIn() {
        $where = Where::NotIn(TestSchema::Column("test1"), array("a","b","c"));

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 NOT IN ('a', 'b', 'c')", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => "a");
        $data2 = array("test1" => "b");
        $data3 = array("test1" => "c");
        $data4 = array("test1" => "d");

        $this->assertFalse($clause($data1));
        $this->assertFalse($clause($data2));
        $this->assertFalse($clause($data3));
        $this->assertTrue($clause($data4));
    }

    public function test_Greater() {
        $where = Where::Greater(TestSchema::Column("test1"), 1);

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 > '1'", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => 1);
        $data2 = array("test1" => 2);

        $this->assertFalse($clause($data1));
        $this->assertTrue($clause($data2));
    }

    public function test_GreaterEqual() {
        $where = Where::GreaterEqual(TestSchema::Column("test1"), 1);

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 >= '1'", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => 0);
        $data2 = array("test1" => 1);
        $data3 = array("test1" => 2);

        $this->assertFalse($clause($data1));
        $this->assertTrue($clause($data2));
        $this->assertTrue($clause($data3));
    }

    public function test_Lesser() {
        $where = Where::Lesser(TestSchema::Column("test1"), 2);

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 < '2'", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => 1);
        $data2 = array("test1" => 2);

        $this->assertTrue($clause($data1));
        $this->assertFalse($clause($data2));
    }

    public function test_LesserEqual() {
        $where = Where::LesserEqual(TestSchema::Column("test1"), 2);

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("test1 <= '2'", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array("test1" => 1);
        $data2 = array("test1" => 2);
        $data3 = array("test1" => 3);

        $this->assertTrue($clause($data1));
        $this->assertTrue($clause($data2));
        $this->assertFalse($clause($data3));
    }

    public function test_And() {
        $where = Where::_And(Where::Equal(TestSchema::Column("test1"), "test2"), Where::Equal(TestSchema::Column("test3"), "test4"));

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("((test1 = 'test2') AND (test3 = 'test4'))", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array(
            "test1" => "test2",
            "test3" => "test4"
        );

        $data2 = array(
            "test1" => "test5",
            "test3" => "test6"
        );

        $this->assertTrue($clause($data1));
        $this->assertFalse($clause($data2));
    }

    public function test_Or() {
        $where = Where::_Or(Where::Equal(TestSchema::Column("test1"), "test2"), Where::Equal(TestSchema::Column("test3"), "test4"));

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("((test1 = 'test2') OR (test3 = 'test4'))", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array(
            "test1" => "test2",
            "test3" => "test4"
        );

        $data2 = array(
            "test1" => "test5",
            "test3" => "test4"
        );

        $data3 = array(
            "test1" => "test5",
            "test3" => "test6"
        );

        $this->assertTrue($clause($data1));
        $this->assertTrue($clause($data2));
        $this->assertFalse($clause($data3));
    }

    public function test_AndOr() {
        $where = Where::_And(
            Where::Equal(TestSchema::Column("test1"), "test2"),
            Where::_Or(
                Where::Equal(TestSchema::Column("test3"), "test4"),
                Where::Equal(TestSchema::Column("test5"), "test6")
            )
        );

        $clause = $where->generate($this->mySqlGenerator);
        self::$logger->log($clause);
        $this->assertEquals("((test1 = 'test2') AND (((test3 = 'test4') OR (test5 = 'test6'))))", $clause);

        /** @var callable $clause */
        $clause = $where->generate($this->inMemoryGenerator);

        $data1 = array(
            "test1" => "test2",
            "test3" => "test4",
            "test5" => "test6"
        );

        $data2 = array(
            "test1" => "test2",
            "test3" => "test4",
            "test5" => "test7"
        );

        $data3 = array(
            "test1" => "test2",
            "test3" => "test7",
            "test5" => "test6"
        );

        $data4 = array(
            "test1" => "test8",
            "test3" => "test7",
            "test5" => "test6"
        );

        $data5 = array(
            "test1" => "test8",
            "test3" => "test4",
            "test5" => "test6"
        );

        $this->assertTrue($clause($data1));
        $this->assertTrue($clause($data2));
        $this->assertTrue($clause($data3));
        $this->assertFalse($clause($data4));
        $this->assertFalse($clause($data5));
    }
}