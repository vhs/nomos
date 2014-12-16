<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:23 PM
 */

namespace app\domain;

use app\schema\KeySchema;
use vhs\database\Database;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\Schema;
use vhs\domain\validations\ValidationResults;

class Key extends Domain {
    /**
     * @return Schema
     */
    public static function getSchema() {
        return KeySchema::getInstance();
    }

    public function validate(ValidationResults &$results) {

    }

    /**
     * @return Privilege[]
     */
    public function getPrivileges() {

        return Privilege::where(Where::In("id", Database::select("keyprivileges", "privilegeid", Where::Equal("keyid", $this->id))));
    }

    public function addPrivilege(Privilege $privilege, $notes = null) {
        $currentPrivileges = $this->getPrivileges();

        /** @var Privilege $priv */
        foreach($currentPrivileges as $priv)
            if($priv->id === $privilege->id) return false;

        $kp = new KeyPrivilege();
        $kp->keyid = $this->id;
        $kp->privilegeid = $privilege->id;
        $kp->created = date('Y-m-d H:i:s');
        $kp->notes = $notes;

        return $kp->save();
    }

    public static function findByRfid($rfid) {
        return self::where(Where::_And(Where::Equal("key", $rfid), Where::Equal("type", "rfid")));
    }
}



