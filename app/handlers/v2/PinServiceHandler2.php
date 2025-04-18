<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 07/01/2015
 * Time: 6:03 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IPinService2;
use app\domain\Key;
use app\domain\Privilege;
use app\schema\SettingsSchema;
use vhs\database\Columns;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\exceptions\HttpException;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;
use vhs\web\enums\HttpStatusCodes;

/** @typescript */
class PinServiceHandler2 extends Service implements IPinService2 {
    /**
     * @permission door
     *
     * @throws \vhs\exceptions\HttpException
     *
     * @return void
     */
    public function AccessInstructions(): void {
        throw new HttpException('Sorry, no dice!', HttpStatusCodes::Server_Error_Not_Implemented);
    }

    /**
     * Automatically generates a pin for a specified user.
     *
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\Key|null
     */
    public function GeneratePin($userid): Key|null {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pin = $this->getUserPinByUserId($userid);

        if (is_null($pin)) {
            $nextpinid = Database::scalar(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Query::Select(SettingsSchema::Table(), new Columns(SettingsSchema::Columns()->nextpinid))
            );

            $key = new Key();
            $key->userid = $userid;
            $key->type = 'pin';
            $key->key = sprintf('%04s', $nextpinid) . '|' . sprintf('%04s', rand(0, 9999));
            $key->notes = 'User generated PIN';

            $pin = $key;

            $priv = Privilege::findByCode('inherit');
            if (!is_null($priv)) {
                // TODO fix typing
                /** @disregard P1006 override */
                $pin->privileges->add($priv);
            }
        }

        $pinid = explode('|', $pin->key)[0];

        $pin->key = sprintf('%04s', $pinid) . '|' . sprintf('%04s', rand(0, 9999));
        $pin->notes = 'User generated PIN';

        $pin->save();

        return $pin;
    }

    /**
     * @permission gen-temp-pin|administrator
     *
     * @param string $expires
     * @param string $privileges
     * @param string $notes
     *
     * @return \app\domain\Key
     */
    public function GenerateTemporaryPin($expires, $privileges, $notes): Key {
        $userid = CurrentUser::getIdentity();

        $nextpinid = Database::scalar(
            // TODO implement proper typing
            // @phpstan-ignore property.notFound
            Query::Select(SettingsSchema::Table(), new Columns(SettingsSchema::Columns()->nextpinid))
        );

        $pin = new Key();
        $pin->userid = $userid;
        $pin->expires = $expires;
        $pin->type = 'pin';
        $pin->key = sprintf('%04s', $nextpinid) . '|' . sprintf('%04s', rand(0, 9999));
        $pin->notes = $notes;

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = explode(',', $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        if (!is_null($privs) && is_array($privs)) {
            foreach ($privs as $priv) {
                if (CurrentUser::hasAllPermissions($priv->code)) {
                    // TODO fix typing
                    /** @disregard P1006 override */
                    $pin->privileges->add($priv);
                }
            }
        }

        $pin->save();

        return $pin;
    }

    /**
     * @permission administrator|user
     *
     * @param int $userid
     *
     * @return \app\domain\Key|null
     */
    public function GetUserPin($userid): Key|null {
        return $this->getUserPinByUserId($userid);
    }

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $pin
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return bool
     */
    public function UpdatePin($keyid, $pin): bool {
        /** @var \app\domain\Key */
        $key = Key::find($keyid);

        if (!CurrentUser::hasAnyPermissions('administrator') && $key->userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pinid = explode('|', $key->key)[0];

        $key->key = $pinid . '|' . sprintf('%04s', intval($pin));

        return $key->save();
    }

    /**
     * Change a pin.
     *
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $pin
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return bool
     */
    public function UpdateUserPin($userid, $pin): bool {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $pinObj = $this->getUserPinByUserId($userid);

        if (is_null($pin)) {
            $pinObj = $this->GeneratePin($userid);
        }

        $pinid = explode('|', $pinObj->key)[0];

        $pinObj->key = $pinid . '|' . $pin;

        return $pinObj->save();
    }

    /**
     * Summary of getUserPinByUserId.
     *
     * @param mixed $userid
     *
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return \app\domain\Key|null
     */
    private function getUserPinByUserId($userid): ?Key {
        if (!CurrentUser::hasAnyPermissions('administrator') && $userid != CurrentUser::getIdentity()) {
            throw new UnauthorizedException();
        }

        $keys = Key::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Key::Schema()->Columns()->type, 'pin'),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Key::Schema()->Columns()->userid, $userid)
            )
        );

        return !empty($keys) ? $keys[0] : null;
    }
}
