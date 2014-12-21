<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 12/12/2014
 * Time: 10:53 PM
 */

use vhs\loggers\ConsoleLogger;
use vhs\migration\Migrator;

class MMPModelTests extends PHPUnit_Framework_TestCase {
    protected $migrator;

    public static function setUpBeforeClass() {
        $migrator = new Migrator(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE, new ConsoleLogger());
        $migrator->migrate(null, "../migrations");
    }

    public static function tearDownAfterClass() {
        \vhs\database\Database::arbitrary("DROP DATABASE " . DB_DATABASE);
    }


    public function setUp() {

    }

    public function tearDown() {

    }

    public function testUser() {
        //TODO
        $this->assertTrue(true);
    }

}