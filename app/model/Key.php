<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:23 PM
 */

namespace app\model;

use vhs\database\Database;
use vhs\database\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

class Key extends Domain {
    public static function getTable() { return 'keys'; }
    public static function getPrimaryKeyColumn() { return 'id'; }
    public static function getColumns()
    {
        return array(
        'userid',
        'type',
        'key',
        'created',
        'notes'
        );
    }

    public $userid;
    public $type;
    public $key;
    public $created;
    public $notes;

    public function validate(ValidationResults &$results) {

    }

    // table relations not yet supported
    public function getPrivileges() {
        $pk = $this->getId();

        return Privilege::where(Where::In("id", Database::select("keyprivileges", "privilegeid", Where::Equal("keyid", $pk))));
    }

    public function addPrivilege(Privilege $privilege, $notes = null) {
        $currentPrivileges = $this->getPrivileges();

        foreach($currentPrivileges as $priv)
            if($priv->getId() === $privilege->getId()) return false;

        $kp = new KeyPrivilege();
        $kp->keyid = $this->getId();
        $kp->privilegeid = $privilege->getId();
        $kp->created = date('Y-m-d H:i:s');
        $kp->notes = $notes;

        return $kp->save();
    }


}

class KeyPrivilege extends Domain {
    public static function getTable() { return 'keyprivileges'; }
    public static function getPrimaryKeyColumn() { return null; }
    public static function getColumns()
    {
        return array(
            'keyid',
            'privilegeid',
            'created',
            'notes'
        );
    }

    public $keyid;
    public $privilegeid;
    public $created;
    public $notes;

    public function validate(ValidationResults &$results) {

    }

    protected function hydrate($primaryKeyValue = null) {
        return false; // cannot hydrate composite keys
    }

    public function delete() {
        return false; // cannot delete via composite keys
    }
}