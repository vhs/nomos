<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/03/2015
 * Time: 6:32 PM.
 */

namespace app\handlers\v2;

use app\contracts\v2\IKeyService2;
use app\domain\Key;
use app\domain\Privilege;
use app\domain\User;
use app\exceptions\InvalidInputException;
use app\schema\SettingsSchema;
use vhs\database\Database;
use vhs\database\queries\Query;
use vhs\database\wheres\Where;
use vhs\security\CurrentUser;
use vhs\security\exceptions\UnauthorizedException;
use vhs\services\Service;

/** @typescript */
class KeyServiceHandler2 extends Service implements IKeyService2 {
    /**
     * @permission administrator|user
     *
     * @param int $id
     *
     * @throws string
     *
     * @return void
     */
    public function DeleteKey($id): void {
        $key = $this->getKeyById($id);

        $key->delete();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $userid
     * @param string $type
     * @param string $value
     * @param string $notes
     *
     * @throws string
     *
     * @return \app\domain\Key|null
     */
    public function GenerateUserKey($userid, $type, $value, $notes): Key|null {
        if (CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions('administrator')) {
            $user = User::find($userid);

            if ($user != null) {
                $key = new Key();

                switch ($type) {
                    case 'rfid':
                        $key->key = $value;

                        break;
                    case 'pin':
                        $nextpinid = Database::scalar(Query::Select(SettingsSchema::Table(), SettingsSchema::Columns()->nextpinid));
                        $key->key = sprintf('%04s', $nextpinid) . '|' . sprintf('%04s', rand(0, 9999));
                        $key->privileges->add(Privilege::findByCode('inherit'));

                        break;
                    case 'api':
                        $key->key = bin2hex(openssl_random_pseudo_bytes(32));

                        break;
                    default:
                        throw new InvalidInputException('Unsupported key type');
                }

                $key->notes = $notes;
                $key->type = $type;
                $key->userid = $userid;

                $key->save();

                return $key;
            }
        }

        return null;
    }

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Key[]
     */
    public function GetAllKeys(): array {
        if (!CurrentUser::hasAnyPermissions('administrator')) {
            throw new UnauthorizedException();
        }

        return Key::findAll();
    }

    /**
     * @permission administrator|user
     *
     * @param int $keyid
     *
     * @throws string
     *
     * @return \app\domain\Key
     */
    public function GetKey($keyid): Key {
        return $this->getKeyById($keyid);
    }

    /**
     * @permission administrator
     *
     * @throws string
     *
     * @return \app\domain\Key[]
     */
    public function GetSystemKeys(): array {
        if (!CurrentUser::hasAnyPermissions('administrator')) {
            throw new UnauthorizedException();
        }

        return Key::where(Where::Null(Key::Schema()->Columns()->userid));
    }

    /**
     * @permission administrator|user
     *
     * @param int      $userid
     * @param string[] $types
     *
     * @throws string
     *
     * @return \app\domain\Key[]
     */
    public function GetUserKeys($userid, $types): array {
        if (CurrentUser::getIdentity() == $userid || CurrentUser::hasAnyPermissions('administrator')) {
            $user = User::find($userid);
            if ($user != null) {
                $keys = [];
                foreach ($user->keys->all() as $key) {
                    if (in_array($key->type, $types)) {
                        array_push($keys, $key);
                    }
                }

                return $keys;
            }
        }

        return [];
    }

    /**
     * @permission administrator|user
     *
     * @param int             $keyid
     * @param string|string[] $privileges
     *
     * @throws string
     *
     * @return bool
     */
    public function PutKeyPrivileges($keyid, $privileges): bool {
        $key = $this->getKeyById($keyid);

        $privArray = $privileges;

        if (!is_array($privArray)) {
            $privArray = [];
            array_push($privArray, $privileges);
        }

        $privs = Privilege::findByCodes(...$privArray);

        foreach ($key->privileges->all() as $priv) {
            $key->privileges->remove($priv);
        }

        foreach ($privs as $priv) {
            $key->privileges->add($priv);
        }

        return $key->save();
    }

    /**
     * @permission administrator|user
     *
     * @param int    $keyid
     * @param string $notes
     * @param string $expires
     *
     * @throws string
     *
     * @return bool
     */
    public function UpdateKey($keyid, $notes, $expires): bool {
        $key = $this->getKeyById($keyid);

        $key->notes = $notes;
        $key->expires = $expires;

        return $key->save();
    }

    /**
     * Summary of getKeyById.
     *
     * @param mixed $keyid
     *
     * @throws \app\exceptions\InvalidInputException
     * @throws \vhs\security\exceptions\UnauthorizedException
     * @throws string
     *
     * @return \app\domain\Key
     */
    private function getKeyById($keyid): Key {
        $key = Key::find($keyid);

        if (is_null($key)) {
            throw new InvalidInputException('Invalid keyid');
        }

        if (!CurrentUser::hasAnyPermissions('administrator')) {
            if (is_null($key->userid) || $key->userid != CurrentUser::getIdentity()) {
                throw new UnauthorizedException();
            }
        }

        return $key;
    }
}
