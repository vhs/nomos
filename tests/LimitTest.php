<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 4:53 PM.
 */

use PHPUnit\Framework\TestCase;
use vhs\database\Database;
use vhs\database\limits\Limit;
use vhs\database\offsets\Offset;
use vhs\Logger;
use vhs\loggers\ConsoleLogger;

/** @typescript */
class LimitTest extends TestCase {
    /** @var Logger */
    private static $logger;

    /**
     * inMemoryGenerator.
     *
     * @var mixed
     */
    private $inMemoryGenerator;

    /**
     * mySqlGenerator.
     *
     * @var mixed
     */
    private $mySqlGenerator;

    /**
     * test_EmptyLimit.
     *
     * @return void
     */
    public function test_EmptyLimit(): void {
        $limit = Limit::Limit(null);

        $clause = $limit->generate($this->mySqlGenerator);
        $this->assertEquals('', $clause);

        /** @var callable $clause */
        $clause = $limit->generate($this->inMemoryGenerator);

        $this->assertEquals('', $clause);
    }

    /**
     * test_EmptyOffset.
     *
     * @return void
     */
    public function test_EmptyOffset(): void {
        $offset = Offset::Offset(null);

        $clause = $offset->generate($this->mySqlGenerator);
        $this->assertEquals('', $clause);

        /** @var callable $clause */
        $clause = $offset->generate($this->inMemoryGenerator);

        $this->assertEquals('', $clause);
    }

    /**
     * test_HasLimit.
     *
     * @return void
     */
    public function test_HasLimit() {
        $limit = Limit::Limit(1);

        $clause = $limit->generate($this->mySqlGenerator);
        $this->assertEquals(' LIMIT 1 ', $clause);

        /** @var callable $clause */
        $clause = $limit->generate($this->inMemoryGenerator);

        $this->assertEquals('1', $clause);
    }

    /**
     * test_HasOffset.
     *
     * @return void
     */
    public function test_HasOffset() {
        $offset = Offset::Offset(10);

        $clause = $offset->generate($this->mySqlGenerator);
        $this->assertEquals(' OFFSET 10 ', $clause);

        /** @var callable $clause */
        $clause = $offset->generate($this->inMemoryGenerator);

        $this->assertEquals('10', $clause);
    }

    /**
     * setUpBeforeClass.
     *
     * @return void
     */
    public static function setUpBeforeClass(): void {
        self::$logger = new ConsoleLogger();
        Database::setLogger(self::$logger);
        Database::setEngine(new \vhs\database\engines\memory\InMemoryEngine());
        Database::setRethrow(true);
    }

    /**
     * tearDownAfterClass.
     *
     * @return void
     */
    public static function tearDownAfterClass(): void {}

    /**
     * setUp.
     *
     * @return void
     */
    public function setUp(): void {
        $this->mySqlGenerator = new \vhs\database\engines\mysql\MySqlGenerator();
        $this->inMemoryGenerator = new \vhs\database\engines\memory\InMemoryGenerator();
    }

    /**
     * tearDown.
     *
     * @return void
     */
    public function tearDown(): void {}
}
