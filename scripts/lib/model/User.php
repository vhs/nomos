<?php
/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:05 PM
 */

class User extends \vhs\Domain {
    public static function getTable() { return 'users'; }
    public static function getPrimaryKeyColumn() { return 'id'; }
    public static function getColumns() {
        return array(
        'username',
        'password',
        'membership_id',
        'mem_expire',
        'trial_used',
        'email',
        'fname',
        'lname',
        'token',
        'cookie_id',
        'newsletter',
        'vetted',
        'cash',
        'userlevel',
        'notes',
        'created',
        'lastlogin',
        'lastip',
        'avatar',
        'active',
        'paypal_id',
        'payment_email'
        ); 
    }
    
    public $username;
    //private $password;
    //public function setPassword($password) { $this->password = $password; }
    public $password;
    public $membership_id;
    public $mem_expire;
    public $trial_used;
    public $email;
    public $fname;
    public $lname;
    public $token;
    public $cookie_id;
    public $newsletter;
    public $vetted;
    public $cash;
    public $userlevel;
    public $notes;
    public $created;
    public $lastlogin;
    public $lastip;
    public $avatar;
    public $active;
    public $paypal_id;
    public $payment_email;

    public function validate(\vhs\ValidationResults &$results) {

    }

    public function getKeys() {
        return Key::where(array("userid" => $this->getId()));
    }
}

