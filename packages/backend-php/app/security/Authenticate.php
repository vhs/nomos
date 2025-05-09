<?php

/**
 * Created by PhpStorm.
 * User: Thomas
 * Date: 04/01/2015
 * Time: 6:21 PM.
 */

namespace app\security;

use app\domain\AccessLog;
use app\domain\AccessToken;
use app\domain\Key;
use app\domain\User;
use app\dto\UserActiveEnum;
use app\exceptions\InvalidAccessTokenCredentialsException;
use app\exceptions\InvalidKeyCredentialsException;
use app\security\credentials\ApiCredentials;
use app\security\credentials\PinCredentials;
use app\security\credentials\RfidCredentials;
use app\security\credentials\TokenCredentials;
use DateTime;
use vhs\database\Database;
use vhs\security\AnonPrincipal;
use vhs\security\BearerTokenCredentials;
use vhs\security\CurrentUser;
use vhs\security\exceptions\InvalidCredentials;
use vhs\security\IAuthenticate;
use vhs\security\ICredentials;
use vhs\security\IPrincipal;
use vhs\security\UserPassCredentials;
use vhs\Singleton;

/**
 * @method static \app\security\Authenticate getInstance()
 *
 * @typescript
 */
class Authenticate extends Singleton implements IAuthenticate {
    /**
     * authenticateOnly.
     *
     * @param mixed $username
     * @param mixed $password
     *
     * @return \app\domain\User
     */
    public static function authenticateOnly($username, $password) {
        return self::userLogin($username, $password, true);
    }

    /**
     * @return IPrincipal
     */
    public static function currentPrincipal() {
        return CurrentUser::getPrincipal();
    }

    /**
     * @return bool
     */
    public static function isAuthenticated() {
        return !CurrentUser::isAnon();
    }

    /**
     * login.
     *
     * @param ICredentials $credentials
     *
     * @throws \app\exceptions\InvalidAccessTokenCredentialsException
     * @throws \app\exceptions\InvalidInputException
     * @throws \app\exceptions\InvalidKeyCredentialsException
     * @throws \app\exceptions\InvalidPasswordHashException
     * @throws \app\exceptions\UserAlreadyExistsException
     * @throws \vhs\domain\exceptions\DomainException
     * @throws \vhs\exceptions\HttpException
     * @throws \vhs\security\exceptions\InvalidCredentials
     * @throws \vhs\security\exceptions\UnauthorizedException
     *
     * @return void
     */
    public static function login(ICredentials $credentials) {
        switch (get_class($credentials)) {
            case 'vhs\\security\\UserPassCredentials':
                /** @var UserPassCredentials $credentials */
                self::userLogin($credentials->getUsername(), $credentials->getPassword());

                break;
            case 'app\\security\\credentials\\ApiCredentials':
                /** @var ApiCredentials $credentials */
                self::keyLogin(Key::findByApiKey($credentials->getToken()), $credentials);

                break;
            case 'app\\security\\credentials\\RfidCredentials':
                /** @var RfidCredentials $credentials */
                self::keyLogin(Key::findByRfid($credentials->getToken()), $credentials);

                break;
            case 'app\\security\\credentials\\PinCredentials':
                /** @var PinCredentials $credentials */
                self::keyLogin(Key::findByPin($credentials->getToken()), $credentials);

                break;
            case 'vhs\\security\\BearerTokenCredentials':
                /** @var BearerTokenCredentials $credentials */
                self::bearerLogin($credentials);

                break;
            default:
                throw new InvalidCredentials('"Unsupported authentication type."');
        }
    }

    /**
     * logout.
     *
     * @return void
     */
    public static function logout() {
        CurrentUser::setPrincipal(new AnonPrincipal());
    }

    /**
     * bearerLogin.
     *
     * @param BearerTokenCredentials $credentials
     *
     * @throws \app\exceptions\InvalidAccessTokenCredentialsException
     *
     * @return void
     */
    private static function bearerLogin(BearerTokenCredentials $credentials) {
        $ipaddr = self::getRemoteIP();

        $token = null;

        try {
            $token = AccessToken::findByToken($credentials->getToken());
        } catch (\Exception $ex) {
            // no further action required
        }

        if (is_null($token) || is_null($token->user)) {
            AccessLog::log($credentials->getToken(), 'bearer', false, $ipaddr);

            throw new InvalidAccessTokenCredentialsException();
        }

        if (
            self::isUserValid($token->user) &&
            (is_null($token->client) ||
                ($token->client->enabled && (is_null($token->client->expires) || new DateTime($token->client->expires) > new DateTime())))
        ) {
            CurrentUser::setPrincipal(self::buildPrincipal($token->user));

            self::recordLogin($token->user, $ipaddr);

            AccessLog::log($credentials->getToken(), 'bearer', true, $ipaddr, $token->user->id);
        } else {
            AccessLog::log($credentials->getToken(), 'bearer', false, $ipaddr, $token->user->id);

            throw new InvalidAccessTokenCredentialsException();
        }
    }

    /**
     * @param \app\domain\User $user
     *
     * @return UserPrincipal
     */
    private static function buildPrincipal($user) {
        $membershipPrivs = [];
        $privileges = [];
        $grants = [];

        if ($user->valid) {
            if (!is_null($user->membership)) {
                $membershipPrivs = array_map(function ($privilege) {
                    return $privilege->code;
                }, $user->membership->privileges->all());
            }

            $privileges = array_merge(
                $membershipPrivs,
                array_map(
                    function ($privilege) {
                        return $privilege->code;
                    },
                    // TODO fix typing
                    /** @disregard P1006 override */
                    $user->privileges->all()
                )
            );

            foreach ($privileges as $priv) {
                if (strpos($priv, 'grant:') === 0) {
                    array_push($grants, substr($priv, 6));
                }
            }

            if (count($grants) > 0) {
                array_push($privileges, 'grants');
            }
        }

        array_push($privileges, 'user');

        return new UserPrincipal($user->id, $privileges, $grants, $user->username);
    }

    /**
     * @param string $username
     *
     * @throws \vhs\security\exceptions\InvalidCredentials
     *
     * @return User
     */
    private static function findUser($username) {
        $users = User::findByUsername($username);

        if (count($users) != 1) {
            //Try e-mail Address
            $users = User::findByEmail($username);
        }

        if (count($users) != 1) {
            throw new InvalidCredentials('"Incorrect username or password"');
        }

        return $users[0];
    }

    /**
     * getRemoteIP.
     *
     * @return string|null
     */
    private static function getRemoteIP() {
        $ipaddr = null;

        if (array_key_exists('REMOTE_ADDR', $_SERVER)) {
            $ipaddr = $_SERVER['REMOTE_ADDR'];
        }

        return $ipaddr;
    }

    /**
     * isUserValid.
     *
     * @param \app\domain\User $user
     *
     * @throws \vhs\security\exceptions\InvalidCredentials
     *
     * @return bool
     */
    private static function isUserValid(User $user) {
        switch ($user->active) {
            case UserActiveEnum::INACTIVE->value: //not active
                throw new InvalidCredentials('"Your account is not activated"');
            case UserActiveEnum::ACTIVE->value: //yes they are active
                return true;
            case UserActiveEnum::PENDING->value: //pending email verification
                throw new InvalidCredentials('"You need to verify your email address"');
            case UserActiveEnum::BANNED->value: //banned
                throw new InvalidCredentials('"Your account has been banned"');
            default:
                return false;
        }
    }

    /**
     * keyLogin.
     *
     * @param mixed                                      $keys
     * @param \app\security\credentials\TokenCredentials $credentials
     *
     * @throws \app\exceptions\InvalidKeyCredentialsException
     *
     * @return void
     */
    private static function keyLogin($keys, TokenCredentials $credentials) {
        $ipaddr = self::getRemoteIP();

        if (count($keys) != 1) {
            AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr);

            throw new InvalidKeyCredentialsException();
        }

        $key = $keys[0];
        $identity = null;
        $name = 'token:' . $key->id . ':';

        $privileges = array_map(function ($priviledge) {
            return $priviledge->code;
        }, $key->privileges->all());

        if (!is_null($key->userid) && $key->userid != '0') {
            try {
                $user = User::find($key->userid);
            } catch (\Exception $ex) {
                AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr, $key->userid);

                throw new InvalidKeyCredentialsException();
            }

            if (!is_null($user) && self::isUserValid($user)) {
                $identity = $user->id;
                $name .= $user->username;

                if (in_array('inherit', $privileges)) {
                    array_push($privileges, 'user');
                    $privileges = array_merge(
                        $privileges,
                        array_map(function ($privilege) {
                            return $privilege->code;
                        }, $user->membership->privileges->all()),
                        array_map(
                            function ($privilege) {
                                return $privilege->code;
                            },
                            // TODO fix typing
                            /** @disregard P1006 override */
                            $user->privileges->all()
                        )
                    );
                }
            } else {
                AccessLog::log($credentials->getToken(), $credentials->getType(), false, $ipaddr);

                throw new InvalidKeyCredentialsException();
            }
        }

        $grants = [];

        foreach ($privileges as $priv) {
            if (strpos($priv, 'grant:') === 0) {
                array_push($grants, substr($priv, 6));
            }
        }

        if (count($grants) > 0) {
            array_push($privileges, 'grants');
        }

        CurrentUser::setPrincipal(new TokenPrincipal(id: $identity, permissions: $privileges, grants: $grants, name: $name));

        AccessLog::log($credentials->getToken(), $credentials->getType(), true, $ipaddr, $key->userid);
    }

    /**
     * record login.
     *
     * @param \app\domain\User $user
     * @param string           $ipaddr
     *
     * @return void
     */
    private static function recordLogin($user, $ipaddr) {
        $user->lastlogin = date(Database::DateFormat());
        $user->lastip = $ipaddr;

        try {
            $user->save();
        } catch (\Exception $ex) {
            self::logout();

            throw $ex;
        }
    }

    /**
     * userLogin.
     *
     * @param string $username
     * @param string $password
     * @param bool   $authonly
     *

     * @throws \vhs\security\exceptions\InvalidCredentials
     *
     * @return \app\domain\User
     */
    private static function userLogin($username, $password, $authonly = false) {
        $ipaddr = self::getRemoteIP();

        try {
            $user = self::findUser($username);
        } catch (\Exception $ex) {
            AccessLog::log($username, 'userpass', false, $ipaddr);

            throw $ex;
        }

        if (self::isUserValid($user) && PasswordUtil::check($password, $user->password)) {
            if (!$authonly) {
                CurrentUser::setPrincipal(self::buildPrincipal($user));
            }

            self::recordLogin($user, $ipaddr);

            AccessLog::log($username, 'userpass', true, $ipaddr, $user->id);

            return $user;
        } else {
            AccessLog::log($username, 'userpass', false, $ipaddr, $user->id);

            throw new InvalidCredentials('"Incorrect username or password"');
        }
    }
}
