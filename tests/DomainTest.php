<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 3:28 PM
 */

class ExampleDomain extends \vhs\Domain {
    public static function getTable() { return 'example'; }
    public static function getPrimaryKeyColumn() { return 'id'; }
    public static function getColumns() { return array('testA', 'testB'); }

    public $testA;
    public $testB;

    public function validate(\vhs\ValidationResults &$results) {
        if($this->testA != "pass")
            $results->add(new \vhs\ValidationFailure("testA is not equal to pass"));
    }

    public static function findOnlyTheBest() {
        return self::arbitraryFind("SELECT * from example where testB = 'best'");
    }
}

class DomainTest extends FullDataTestBase {

    protected function setUp() {
        self::$db->query("CREATE TABLE example ( id int(11) not null auto_increment, testA varchar(255) null, testB varchar(255) null, PRIMARY  key (id));");
    }

    public function testObjectCreate() {

        $eg = new ExampleDomain();
        $eg->testA = "pass";
        $eg->testB = "fuck";

        $this->assertTrue($eg->save(), "save failed but prob through an exception.");

        $id = $eg->getId();

        $this->assertEquals($id, 1);

        unset($eg);

        $eg = ExampleDomain::find(1);

        $this->assertEquals($eg->testB, "fuck");
    }

    protected function tearDown() {
        self::$db->query("DROP TABLE example;");
    }
}
 