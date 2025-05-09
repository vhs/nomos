<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 11/12/2014
 * Time: 5:23 PM.
 */

namespace app\domain;

use app\schema\KeyPrivilegeSchema;
use app\schema\KeySchema;
use vhs\database\wheres\Where;
use vhs\domain\Domain;
use vhs\domain\validations\ValidationResults;

/**
 * Key domain implementation.
 *
 * @property int              $id
 * @property int              $keyid
 * @property int|null         $userid
 * @property string           $key
 * @property string           $type
 * @property \DateTime|string $created
 * @property string           $notes
 * @property string           $expires
 * @property object           $privileges
 *
 * @extends Domain<Key>
 *
 *  @typescript
 */
class Key extends Domain {
    /**
     * Define.
     *
     * @return void
     */
    public static function Define(): void {
        Key::Schema(KeySchema::Type());

        Key::Relationship('privileges', Privilege::Type(), KeyPrivilegeSchema::Type());
    }

    /**
     * find key by api key.
     *
     * @param string $key
     *
     * @return \app\domain\Key[]
     */
    public static function findByApiKey($key) {
        return self::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->type, 'api'),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->key, $key)
            )
        );
    }

    /**
     * find key by pin key.
     *
     * @param string $pin
     *
     * @return Key[]|null
     */
    public static function findByPin($pin) {
        return self::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->type, 'pin'),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->key, $pin)
            )
        );
    }

    /**
     * find key by rfid key.
     *
     * @param string $rfid
     *
     * @return Key[]|null
     */
    public static function findByRfid($rfid) {
        return self::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->type, 'rfid'),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->key, $rfid)
            )
        );
    }

    /**
     * find key by service key.
     *
     * @param string $service
     * @param string $key
     *
     * @return Key[]|null
     */
    public static function findByService($service, $key) {
        return self::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->type, $service),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->key, $key)
            )
        );
    }

    /**
     * find keys by types.
     *
     * @param string ...$types
     *
     * @return Key[]|null
     */
    public static function findByTypes(...$types) {
        // TODO implement proper typing
        // @phpstan-ignore property.notFound
        return self::where(Where::In(KeySchema::Columns()->type, $types));
    }

    /**
     * find by key and type.
     *
     * @param string $key
     * @param string $type
     *
     * @return Key[]|null
     */
    public static function findKeyAndType($key, $type) {
        return self::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->type, $type),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->key, $key)
            )
        );
    }

    /**
     * get system (non-owned) api keys.
     *
     * @return Key[]|null
     */
    public static function getSystemApiKeys() {
        return self::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Null(KeySchema::Columns()->userid),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(KeySchema::Columns()->type, 'api')
            )
        );
    }

    /**
     * get api keys for a particular user id.
     *
     * @param int $userid
     *
     * @return Key[]|null
     */
    public static function getUserApiKeys($userid) {
        return self::where(
            Where::_And(
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Key::Schema()->Columns()->type, 'api'),
                // TODO implement proper typing
                // @phpstan-ignore property.notFound
                Where::Equal(Key::Schema()->Columns()->userid, $userid)
            )
        );
    }

    /**
     * getAbsolutePrivileges.
     *
     * @return mixed
     */
    public function getAbsolutePrivileges() {
        $privs = [];

        // TODO fix typing
        /** @disregard P1006 PHP0404 override */
        foreach ($this->privileges->all() as $priv) {
            if ($priv->code === 'inherit' && $this->userid != null) {
                $user = User::find($this->userid);

                if ($user != null) {
                    // TODO fix typing
                    /** @disregard P1006 override */
                    foreach ($user->privileges->all() as $userpriv) {
                        array_push($privs, $userpriv);
                    }

                    if (!is_null($user->membership)) {
                        // TODO fix typing
                        /** @disregard P1006 PHP0404 override */
                        foreach ($user->membership->privileges->all() as $mempriv) {
                            array_push($privs, $mempriv);
                        }
                    }
                }
            }

            array_push($privs, $priv);
        }

        $retval = [];

        foreach (array_unique($privs) as $priv) {
            //hack array_unique may convert to object
            array_push($retval, $priv);
        }

        return $retval;
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
