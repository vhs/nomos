<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 4:31 PM
 */

class FullDataTestBase extends PHPUnit_Framework_TestCase {

    /*
     * This is essentially a fundamental design problem. We should be mocking the classes that use the database to test
     *  them properly.
     */

    protected $migrator;
    protected static $db;

    public static function setUpBeforeClass() {

        $migrator = new Migrator(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE, new ConsoleMigratorLogger());

        $migrator->migrate(null, "../migrations");

        Registry::set('Database',new Database(DB_SERVER, DB_USER, DB_PASS, DB_DATABASE));
        self::$db = Registry::get("Database");
        self::$db->connect();
    }

    public static function tearDownAfterClass() {
        //drop the database
    }
} 