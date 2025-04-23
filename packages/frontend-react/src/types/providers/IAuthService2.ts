/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
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

export interface IAuthService2 {
    /**
     * Check to see if the user pin and account is valid.
     *
     * @permission administrator|pin-auth
     *
     * @param {string} pin
     *
     * @returns {AuthCheckResult}
     */
    CheckPin: (pin: string) => BackendResult<AuthCheckResult>

    /**
     * @permission administrator|rfid-auth
     *
     * @param {string} rfid
     *
     * @returns {AuthCheckResult}
     */
    CheckRfid: (rfid: string) => BackendResult<AuthCheckResult>

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
    CheckService: (service: string, id: string) => BackendResult<AuthCheckResult>

    /**
     * @permission anonymous
     *
     * @param {string} username
     *
     * @returns {boolean}
     */
    CheckUsername: (username: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountAccessLog: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountClients: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountUserAccessLog: (userid: number, filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountUserClients: (userid: number, filters: Filter | null) => BackendResult<number>

    /**
     * @permission anonymous
     *
     * @returns {UserPrincipal|AnonPrincipal|IPrincipal}
     */
    CurrentUser: () => BackendResult<UserPrincipal | AnonPrincipal | IPrincipal>

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @returns {void}
     */
    DeleteClient: (id: number) => BackendResult<void>

    /**
     * @permission administrator|user
     *
     * @param {number}  id
     * @param {boolean} enabled
     *
     * @returns {boolean}
     */
    EnableClient: (id: number, enabled: boolean) => BackendResult<boolean>

    /**
     * @permission oauth-provider
     *
     * @param {string} bearerToken
     *
     * @returns {AccessToken}
     */
    GetAccessToken: (bearerToken: string) => BackendResult<AccessToken>

    /**
     * @permission anonymous
     *
     * @param {number} clientId
     * @param {string} clientSecret
     *
     * @returns {TrimmedAppClient|null}
     */
    GetClient: (clientId: number, clientSecret: string) => BackendResult<TrimmedAppClient | null>

    /**
     * @permission oauth-provider
     * @permission authenticated
     *
     * @param {number} clientId
     *
     * @returns {TrimmedAppClient|null}
     */
    GetClientInfo: (clientId: number) => BackendResult<TrimmedAppClient | null>

    /**
     * @permission oauth-provider
     *
     * @param {string} refreshToken
     *
     * @returns {RefreshToken}
     */
    GetRefreshToken: (refreshToken: string) => BackendResult<RefreshToken>

    /**
     * @permission oauth-provider
     *
     * @param {string} username
     * @param {string} password
     *
     * @returns {TrimmedUser|null}
     */
    GetUser: (username: string, password: string) => BackendResult<TrimmedUser | null>

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
    ListAccessLog: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<AccessLogs>

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
    ListClients: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<AppClients>

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
    ListUserAccessLog: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<AccessLogs>

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
    ListUserClients: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<AppClients>

    /**
     * @permission anonymous
     *
     * @param {string} username
     * @param {string} password
     *
     * @returns {string}
     */
    Login: (username: string, password: string) => BackendResult<string>

    /**
     * @permission user
     *
     * @returns {void}
     */
    Logout: () => BackendResult<void>

    /**
     * @permission anonymous
     *
     * @param {string} pin
     *
     * @returns {string}
     */
    PinLogin: (pin: string) => BackendResult<string>

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
    RegisterClient: (name: string, description: string, url: string, redirecturi: string) => BackendResult<AppClient>

    /**
     * @permission oauth-provider
     *
     * @param {string} refreshToken
     *
     * @returns {void}
     */
    RevokeRefreshToken: (refreshToken: string) => BackendResult<void>

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
    SaveAccessToken: (
        userId: number,
        accessToken: string,
        clientId: number,
        expires: string
    ) => BackendResult<User | false>

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
    SaveRefreshToken: (
        userId: number,
        refreshToken: string,
        clientId: number,
        expires: string
    ) => BackendResult<TrimmedUser>
}
