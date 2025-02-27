<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:26 PM.
 */

namespace app\domain;

use app\schema\PrivilegeSchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;

/** @typescript */
class Privilege extends Domain {
    public static function Define() {
        Privilege::Schema(PrivilegeSchema::Type());
    }

    public static function findByCode($code) {
        if (!self::checkCodeAccess($code)) {
            throw new UnauthorizedException();
        }

        $privs = Privilege::where(Where::Equal(Privilege::Schema()->Columns()->code, $code));

        if (!empty($privs)) {
            return $privs[0];
        }

        return null;
    }

    public static function findByCodes(...$codes) {
        if (!self::checkCodeAccess(...$codes)) {
            throw new UnauthorizedException();
        }

        return Privilege::where(Where::In(Privilege::Schema()->Columns()->code, $codes));
    }

    private static function checkCodeAccess(...$codes) {
        foreach ($codes as $code) {
            if (
                $code != 'inherit' &&
                !CurrentUser::hasAllPermissions('administrator') &&
                !CurrentUser::hasAllPermissions($code) &&
                !CurrentUser::canGrantAllPermissions($code)
            ) {
                return false;
            }
        }

        return true;
    }

    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
