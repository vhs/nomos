<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/12/2014
 * Time: 10:48 PM
 */

namespace app\model;

/*
 *

CREATE TABLE IF NOT EXISTS `accesslog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rfid_key` varchar(64) CHARACTER SET utf8 NOT NULL,
  `authorized` tinyint(1) NOT NULL,
  `from_ip` varchar(15) CHARACTER SET utf8 NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
 */

use vhs\database\OrderBy;
use vhs\database\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class AccessLog extends Domain {
    public static function getTable() { return "accesslog"; }
    public static function getPrimaryKeyColumn() { return "id"; }
    public static function getColumns() {
        return array("rfid_key", "authorized", "from_ip", "time");
    }

    public $rfid_key;
    public $authorized;
    public $from_ip;
    public $time;

    /**
     * @param ValidationResults $results
     * @return bool
     */
    public function validate(ValidationResults &$results) {
        return true;
    }

    public static function findLatest($limit = 5) {
        self::hydrateMany(Where::Equal("authorized", false), OrderBy::Descending("time"), $limit);
    }
}