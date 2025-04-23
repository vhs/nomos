/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { IAuthService2 } from '@/types/providers/IAuthService2'
import type {
    AccessLogs,
    AccessToken,
    AnonPrincipal,
    AppClient,
    AppClients,
    AuthCheckResult,
    IPrincipal,
    RefreshToken,
    TrimmedAppClient,
    TrimmedUser,
    User,
    UserPrincipal
} from '@/types/validators/records'

export default class AuthService2 implements IAuthService2 {
    /**
     * Check to see if the user pin and account is valid.
     *
     * @permission administrator|pin-auth
     *
     * @param {string} pin
     *
     * @returns {AuthCheckResult}
     */
    async CheckPin(pin: string): BackendResult<AuthCheckResult> {
        return await backendCall('/services/v2/AuthService2.svc/CheckPin', { pin })
    }

    /**
     * @permission administrator|rfid-auth
     *
     * @param {string} rfid
     *
     * @returns {AuthCheckResult}
     */
    async CheckRfid(rfid: string): BackendResult<AuthCheckResult> {
        return await backendCall('/services/v2/AuthService2.svc/CheckRfid', { rfid })
    }

    /**
     * Check to see if the user service/id is valid. A service could be github/slack/google.
     *
     * @permission administrator|service-auth
     *
     * @param {string} service
     * @param {string} id
     *
     * @returns {AuthCheckResult}
     */
    async CheckService(service: string, id: string): BackendResult<AuthCheckResult> {
        return await backendCall('/services/v2/AuthService2.svc/CheckService', { service, id })
    }

    /**
     * @permission anonymous
     *
     * @param {string} username
     *
     * @returns {boolean}
     */
    async CheckUsername(username: string): BackendResult<boolean> {
        return await backendCall('/services/v2/AuthService2.svc/CheckUsername', { username })
    }

    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountAccessLog(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountAccessLog', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountClients(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountClients', { filters })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountUserAccessLog(userid: number, filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountUserAccessLog', { userid, filters })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountUserClients(userid: number, filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountUserClients', { userid, filters })
    }

    /**
     * @permission anonymous
     *
     * @returns {UserPrincipal|AnonPrincipal|IPrincipal}
     */
    async CurrentUser(): BackendResult<UserPrincipal | AnonPrincipal | IPrincipal> {
        return await backendCall('/services/v2/AuthService2.svc/CurrentUser', {})
    }

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @returns {void}
     */
    async DeleteClient(id: number): BackendResult<void> {
        return await backendCall('/services/v2/AuthService2.svc/DeleteClient', { id })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}  id
     * @param {boolean} enabled
     *
     * @returns {boolean}
     */
    async EnableClient(id: number, enabled: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/AuthService2.svc/EnableClient', { id, enabled })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} bearerToken
     *
     * @returns {AccessToken}
     */
    async GetAccessToken(bearerToken: string): BackendResult<AccessToken> {
        return await backendCall('/services/v2/AuthService2.svc/GetAccessToken', { bearerToken })
    }

    /**
     * @permission anonymous
     *
     * @param {number} clientId
     * @param {string} clientSecret
     *
     * @returns {TrimmedAppClient|null}
     */
    async GetClient(clientId: number, clientSecret: string): BackendResult<TrimmedAppClient | null> {
        return await backendCall('/services/v2/AuthService2.svc/GetClient', { clientId, clientSecret })
    }

    /**
     * @permission oauth-provider
     * @permission authenticated
     *
     * @param {number} clientId
     *
     * @returns {TrimmedAppClient|null}
     */
    async GetClientInfo(clientId: number): BackendResult<TrimmedAppClient | null> {
        return await backendCall('/services/v2/AuthService2.svc/GetClientInfo', { clientId })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} refreshToken
     *
     * @returns {RefreshToken}
     */
    async GetRefreshToken(refreshToken: string): BackendResult<RefreshToken> {
        return await backendCall('/services/v2/AuthService2.svc/GetRefreshToken', { refreshToken })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} username
     * @param {string} password
     *
     * @returns {TrimmedUser|null}
     */
    async GetUser(username: string, password: string): BackendResult<TrimmedUser | null> {
        return await backendCall('/services/v2/AuthService2.svc/GetUser', { username, password })
    }

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {AccessLogs}
     */
    async ListAccessLog(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<AccessLogs> {
        return await backendCall('/services/v2/AuthService2.svc/ListAccessLog', { page, size, columns, order, filters })
    }

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {AppClients}
     */
    async ListClients(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<AppClients> {
        return await backendCall('/services/v2/AuthService2.svc/ListClients', { page, size, columns, order, filters })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {AccessLogs}
     */
    async ListUserAccessLog(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<AccessLogs> {
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
     * @param {number}      userid
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {AppClients}
     */
    async ListUserClients(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<AppClients> {
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
     * @param {string} username
     * @param {string} password
     *
     * @returns {string}
     */
    async Login(username: string, password: string): BackendResult<string> {
        return await backendCall('/services/v2/AuthService2.svc/Login', { username, password })
    }

    /**
     * @permission user
     *
     * @returns {void}
     */
    async Logout(): BackendResult<void> {
        return await backendCall('/services/v2/AuthService2.svc/Logout', {})
    }

    /**
     * @permission anonymous
     *
     * @param {string} pin
     *
     * @returns {string}
     */
    async PinLogin(pin: string): BackendResult<string> {
        return await backendCall('/services/v2/AuthService2.svc/PinLogin', { pin })
    }

    /**
     * @permission administrator|user
     *
     * @param {string} name
     * @param {string} description
     * @param {string} url
     * @param {string} redirecturi
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
     * @param {string} refreshToken
     *
     * @returns {void}
     */
    async RevokeRefreshToken(refreshToken: string): BackendResult<void> {
        return await backendCall('/services/v2/AuthService2.svc/RevokeRefreshToken', { refreshToken })
    }

    /**
     * @permission oauth-provider
     *
     * @param {number} userId
     * @param {string} accessToken
     * @param {number} clientId
     * @param {string} expires
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
     * @param {number} userId
     * @param {string} refreshToken
     * @param {number} clientId
     * @param {string} expires
     *
     * @returns {TrimmedUser}
     */
    async SaveRefreshToken(
        userId: number,
        refreshToken: string,
        clientId: number,
        expires: string
    ): BackendResult<TrimmedUser> {
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
