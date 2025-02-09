/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */

import type User from '../db/User'

import type { BackendResult } from '@/types/custom'
import type { IAuthService2 } from '@/types/providers/IAuthService2'
import type { Filter } from '@/types/query-filters'
import type {
    AuthCheckResult,
    UserPrincipal,
    AccessToken,
    AppClient,
    TrimmedAppClient,
    RefreshToken,
    TrimmedUser,
    AccessLog
} from '@/types/records'

import { backendCall } from '../backend'

export default class AuthService2 implements IAuthService2 {
    /**
     * Check to see if the user pin and account is valid.
     *
     * @permission administrator|pin-auth
     *
     * @param {string} $pin
     *
     * @throws {string}
     *
     * @returns {AuthCheckResult}
     */
    async CheckPin(pin: string): BackendResult<AuthCheckResult> {
        return await backendCall('/services/v2/AuthService2.svc/CheckPin', { pin })
    }

    /**
     * @permission administrator|rfid-auth
     *
     * @param {string} $rfid
     *
     * @throws {string}
     *
     * @returns {AuthCheckResult}
     */
    async CheckRfid(rfid: string): BackendResult<AuthCheckResult> {
        return await backendCall('/services/v2/AuthService2.svc/CheckRfid', { rfid })
    }

    /**
     * @permission administrator|service-auth
     *
     * @param {string} $service
     * @param {string} $id
     *
     * @throws {string}
     *
     * @returns {AuthCheckResult}
     */
    async CheckService(service: string, id: string): BackendResult<AuthCheckResult> {
        return await backendCall('/services/v2/AuthService2.svc/CheckRfid', { service, id })
    }

    /**
     * @permission anonymous
     *
     * @param {string} $username
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async CheckUsername(username: string): BackendResult<boolean> {
        return await backendCall('/services/v2/AuthService2.svc/CheckUsername', {
            username
        })
    }

    /**
     * @permission administrator
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountAccessLog(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountAccessLog', {
            filters
        })
    }

    /**
     * @permission administrator
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountClients(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountClients', {
            filters
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}    $userid
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountUserAccessLog(userid: number, filters: string): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountUserAccessLog', {
            userid,
            filters
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}    $userid
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountUserClients(userid: number, filters: string): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountUserClients', {
            userid,
            filters
        })
    }

    /**
     * @permission anonymous
     *
     * @throws {string}
     *
     * @returns {UserPrincipal}
     */
    async CurrentUser(): BackendResult<UserPrincipal> {
        return await backendCall('/services/v2/AuthService2.svc/CurrentUser')
    }

    /**
     * @permission administrator|user
     *
     * @param {number} $id
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async DeleteClient(id: number): BackendResult<void> {
        await backendCall('/services/v2/AuthService2.svc/DeleteClient', {
            id
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}  $id
     * @param {boolean} $enabled
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async EnableClient(id: number, enabled: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/AuthService2.svc/EnableClient', {
            id,
            enabled
        })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} $bearerToken
     *
     * @throws {string}
     *
     * @returns {AccessToken}
     */
    async GetAccessToken(bearerToken: string): BackendResult<AccessToken> {
        return await backendCall('/services/v2/AuthService2.svc/GetAccessToken', {
            bearerToken
        })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} $clientId
     * @param {string} $clientSecret
     *
     * @throws {string}
     *
     * @returns {AppClient|null}
     */
    async GetClient(clientId: string, clientSecret: string): BackendResult<AppClient | null> {
        return await backendCall('/services/v2/AuthService2.svc/GetClient', {
            clientId,
            clientSecret
        })
    }

    /**
     * @permission oauth-provider
     * @permission authenticated
     *
     * @param {string} $clientId
     *
     * @throws {string}
     *
     * @returns {TrimmedAppClient|null}
     */
    async GetClientInfo(clientId: string): BackendResult<TrimmedAppClient | null> {
        return await backendCall('/services/v2/AuthService2.svc/GetClientInfo', {
            clientId
        })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} $refreshToken
     *
     * @throws {string}
     *
     * @returns {RefreshToken}
     */
    async GetRefreshToken(refreshToken: string): BackendResult<RefreshToken> {
        return await backendCall('/services/v2/AuthService2.svc/GetRefreshToken', {
            refreshToken
        })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} $username
     * @param {string} $password
     *
     * @throws {string}
     *
     * @returns {TrimmedUser|null}
     */
    async GetUser(username: string, password: string): BackendResult<TrimmedUser | null> {
        return await backendCall('/services/v2/AuthService2.svc/GetUser', {
            username,
            password
        })
    }

    /**
     * @permission administrator
     *
     * @param {number}    $page
     * @param {number}    $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {AccessLog[]}
     */
    async ListAccessLog(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<AccessLog[]> {
        return await backendCall('/services/v2/AuthService2.svc/ListAccessLog', {
            page,
            size,
            columns,
            order,
            filters
        })
    }

    /**
     * @permission administrator
     *
     * @param {number}    $page
     * @param {number}    $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {AppClient[]}
     */
    async ListClients(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<AppClient[]> {
        return await backendCall('/services/v2/AuthService2.svc/ListClients', {
            page,
            size,
            columns,
            order,
            filters
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}                $userid
     * @param {number}                $page
     * @param {number}                $size
     * @param {string}             $columns
     * @param {string}             $order
     * @param {Filter} $filters
     *
     * @throws {string}
     *
     * @returns {AccessLog[]}
     */
    async ListUserAccessLog(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter
    ): BackendResult<AccessLog[]> {
        return await backendCall('/services/v2/AuthService2.svc/ListUserAccessLog', {
            userid,
            page,
            size,
            columns,
            order,
            filters
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}    $userid
     * @param {number}    $page
     * @param {number}    $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     * @throws {\Exception}
     *
     * @returns {AppClient[]}
     */
    async ListUserClients(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<AppClient[]> {
        return await backendCall('/services/v2/AuthService2.svc/ListUserClients', {
            userid,
            page,
            size,
            columns,
            order,
            filters
        })
    }

    /**
     * @permission anonymous
     *
     * @param {string} $username
     * @param {string} $password
     *
     * @throws {string}
     *
     * @returns {string}
     */
    async Login(username: string, password: string): BackendResult<string> {
        return await backendCall('/services/v2/AuthService2.svc/Login', {
            username,
            password
        })
    }

    /**
     * @permission user
     *
     * @throws {string}
     *
     * @returns {void}
     */
    async Logout(): BackendResult<void> {
        return await backendCall('/services/v2/AuthService2.svc/Logout', {})
    }

    /**
     * @permission anonymous
     *
     * @param {string} $pin
     *
     * @throws {string}
     *
     * @returns {string}
     */
    async PinLogin(pin: string): BackendResult<string> {
        return await backendCall('/services/v2/AuthService2.svc/PinLogin', {
            pin
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {string} $name
     * @param {string} $description
     * @param {string} $url
     * @param {string} $redirecturi
     *
     * @throws {string}
     *
     * @returns {AppClient}
     */
    async RegisterClient(
        name: string,
        description: string,
        url: string,
        redirecturi: string
    ): BackendResult<AppClient> {
        return await backendCall('/services/v2/AuthService2.svc/RegisterClient', {
            name,
            description,
            url,
            redirecturi
        })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} $refreshToken
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async RevokeRefreshToken(refreshToken: string): BackendResult<boolean> {
        return await backendCall('/services/v2/AuthService2.svc/RevokeRefreshToken', {
            refreshToken
        })
    }

    /**
     * @permission oauth-provider
     *
     * @param {number}    $userId
     * @param {string} $accessToken
     * @param {number}    $clientId
     * @param {string} $expires
     *
     * @throws {string}
     *
     * @returns {User|false}
     */
    async SaveAccessToken(
        userId: number,
        accessToken: string,
        clientId: number,
        expires: string
    ): BackendResult<User | false> {
        return await backendCall('/services/v2/AuthService2.svc/SaveAccessToken', {
            userId,
            accessToken,
            clientId,
            expires
        })
    }

    /**
     * @permission oauth-provider
     *
     * @param {number}    $userId
     * @param {string} $refreshToken
     * @param {number}    $clientId
     * @param {string} $expires
     *
     * @throws {string}
     *
     * @returns {RefreshToken|false|null}
     */
    async SaveRefreshToken(
        userId: number,
        refreshToken: string,
        clientId: number,
        expires: string
    ): BackendResult<RefreshToken | false | null> {
        return await backendCall('/services/v2/AuthService2.svc/SaveRefreshToken', {
            userId,
            refreshToken,
            clientId,
            expires
        })
    }

    private static _instance: AuthService2

    public static getInstance(): AuthService2 {
        if (AuthService2._instance == null) {
            AuthService2._instance = new AuthService2()
        }

        return AuthService2._instance
    }
}
