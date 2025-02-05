<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 13/01/2015
 * Time: 5:36 PM.
 */

namespace app\security;

if (!defined('PASSWORD_BCRYPT')) {
    define('PASSWORD_BCRYPT', 1);
}

if (!defined('PASSWORD_DEFAULT')) {
    define('PASSWORD_DEFAULT', PASSWORD_BCRYPT);
}

/** @typescript */
class PasswordUtil {
    public static function check($password, $hash) {
        return password_verify(sha1($password), $hash);
        // return self::password_verify(sha1($password), $hash);
    }

    /**
     * check if a variable is a valid string.
     *
     * @param any $testVal
     *
     * @return bool
     */
    public static function checkValidString($testVal) {
        gettype($testVal) === 'string' && $testVal !== '';
    }

    public static function generate() {
        return self::hash(self::generateRandomString());
    }

    public static function hash($password) {
        return password_hash(sha1($password), PASSWORD_BCRYPT);
    }

    private static function generateRandomString($length = 16) {
        $randStr = str_shuffle(str_repeat('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', $length));

        return substr($randStr, 0, $length);
    }
}
