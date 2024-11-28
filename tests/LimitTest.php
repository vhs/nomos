<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:53 PM
 */

use PHPUnit\Framework\TestCase;
use vhs\database\Database;
use vhs\database\limits\Limit;
use vhs\database\offsets\Offset;
use vhs\database\Table;
use vhs\database\types\Type;
use vhs\domain\Schema;
use vhs\Logger;
use vhs\loggers\ConsoleLogger;

class LimitTest extends TestCase {
    /** @var Logger */
    private static $logger;
    private $inMemoryGenerator;

    private $mySqlGenerator;

    public function test_EmptyLimit() {
        $limit = Limit::Limit(null);

        $clause = $limit->generate($this->mySqlGenerator);
        $this->assertEquals('', $clause);

        /** @var callable $clause */
        $clause = $limit->generate($this->inMemoryGenerator);

        $this->assertEquals('', $clause);
    }

    public function test_EmptyOffset() {
        $offset = Offset::Offset(null);

        $clause = $offset->generate($this->mySqlGenerator);
        $this->assertEquals('', $clause);

        /** @var callable $clause */
        $clause = $offset->generate($this->inMemoryGenerator);

        $this->assertEquals('', $clause);
    }

    public function test_HasLimit() {
        $limit = Limit::Limit(1);

        $clause = $limit->generate($this->mySqlGenerator);
        $this->assertEquals(' LIMIT 1 ', $clause);

        /** @var callable $clause */
        $clause = $limit->generate($this->inMemoryGenerator);

        $this->assertEquals('1', $clause);
    }

    public function test_HasOffset() {
        $offset = Offset::Offset(10);

        $clause = $offset->generate($this->mySqlGenerator);
        $this->assertEquals(' OFFSET 10 ', $clause);

        /** @var callable $clause */
        $clause = $offset->generate($this->inMemoryGenerator);

        $this->assertEquals('10', $clause);
    }

    public static function setUpBeforeClass(): void {
        self::$logger = new ConsoleLogger();
        Database::setLogger(self::$logger);
        Database::setEngine(new \vhs\database\engines\memory\InMemoryEngine());
        Database::setRethrow(true);
    }

    public static function tearDownAfterClass(): void {
    }

    public function setUp(): void {
        $this->mySqlGenerator = new \vhs\database\engines\mysql\MySqlGenerator();
        $this->inMemoryGenerator = new \vhs\database\engines\memory\InMemoryGenerator();
    }

    public function tearDown(): void {
    }
}
