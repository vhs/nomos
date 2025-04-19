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

/**
 * Privilege domain implementation.
 *
 * @property int    $id
 * @property string $name
 * @property string $code
 * @property string $description
 * @property string $icon
 * @property bool   $enabled
 *
 * @extends Domain<Privilege>
 *
 * @typescript
 */
class Privilege extends Domain {
    /**
     * Define
     *
     * @return void
     */
    public static function Define(): void {
        Privilege::Schema(PrivilegeSchema::Type());
    }

    /**
     * findByCode.
     *
     * @param string $code
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return Privilege|null
     */
    public static function findByCode($code) {
        if (!self::checkCodeAccess($code)) {
            throw new UnauthorizedException();
        }

        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        $privs = Privilege::where(Where::Equal(Privilege::Schema()->Columns()->code, $code));

        if (!empty($privs)) {
            return $privs[0];
        }

        return null;
    }

    /**
     * findByCodes.
     *
     * @param string ...$codes
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return Privilege[]|null
     */
    public static function findByCodes(string ...$codes) {
        if (!self::checkCodeAccess(...$codes)) {
            throw new UnauthorizedException();
        }

        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return Privilege::where(Where::In(Privilege::Schema()->Columns()->code, $codes));
    }

    /**
     * checkCodeAccess.
     *
     * @param string ...$codes
     *
     * @return bool
     */
    private static function checkCodeAccess(string ...$codes) {
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

    /**
     * validate.
     *
     * @param \vhs\domain\validations\ValidationResults $results
     *
     * @return void
     */
    public function validate(ValidationResults &$results) {
        // TODO: Implement validate() method.
    }
}
