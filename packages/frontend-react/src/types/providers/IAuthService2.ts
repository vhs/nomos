/* eslint-disable @typescript-eslint/max-params */
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
     * @throws {string}
     *
     * @returns {AuthCheckResult}
     */
    CheckPin: (pin: string) => BackendResult<AuthCheckResult>

    /**
     * @permission administrator|rfid-auth
     *
     * @param {string} rfid
     *
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {AuthCheckResult}
     */
    CheckService: (service: string, id: string) => BackendResult<AuthCheckResult>

    /**
     * @permission anonymous
     *
     * @param {string} username
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    CheckUsername: (username: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountAccessLog: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountClients: (filters: string) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number}    userid
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountUserAccessLog: (userid: number, filters: string) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number}    userid
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountUserClients: (userid: number, filters: string) => BackendResult<number>

    /**
     * @permission anonymous
     *
     * @throws {string}
     *
     * @returns {UserPrincipal|AnonPrincipal}
     */
    CurrentUser: () => BackendResult<UserPrincipal | AnonPrincipal>

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {boolean}
     */
    EnableClient: (id: number, enabled: boolean) => BackendResult<boolean>

    /**
     * @permission oauth-provider
     *
     * @param {string} bearerToken
     *
     * @throws {string}
     *
     * @returns {AccessToken}
     */
    GetAccessToken: (bearerToken: string) => BackendResult<AccessToken>

    /**
     * @permission anonymous
     *
     * @param {string} clientId
     * @param {string} clientSecret
     *
     * @throws {string}
     *
     * @returns {AppClient|null}
     */
    GetClient: (clientId: string, clientSecret: string) => BackendResult<AppClient | null>

    /**
     * @permission oauth-provider
     * @permission authenticated
     *
     * @param {string} clientId
     *
     * @throws {string}
     *
     * @returns {TrimmedAppClient|null}
     */
    GetClientInfo: (clientId: string) => BackendResult<TrimmedAppClient | null>

    /**
     * @permission oauth-provider
     *
     * @param {string} refreshToken
     *
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {TrimmedUser|null}
     */
    GetUser: (username: string, password: string) => BackendResult<TrimmedUser | null>

    /**
     * @permission administrator
     *
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {AccessLogs}
     */
    ListAccessLog: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<AccessLogs>

    /**
     * @permission administrator
     *
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {AppClients}
     */
    ListClients: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<AppClients>

    /**
     * @permission administrator|user
     *
     * @param {number}                userid
     * @param {number}                page
     * @param {number}                size
     * @param {string}             columns
     * @param {string}             order
     * @param {Filter} filters
     *
     * @throws {string}
     * @throws {\Exception}
     *
     * @returns {AccessLogs}
     */
    ListUserAccessLog: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter
    ) => BackendResult<AccessLogs>

    /**
     * @permission administrator|user
     *
     * @param {number}    userid
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     * @throws {\Exception}
     *
     * @returns {AppClients}
     */
    ListUserClients: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<AppClients>

    /**
     * @permission anonymous
     *
     * @param {string} username
     * @param {string} password
     *
     * @throws {string}
     *
     * @returns {string}
     */
    Login: (username: string, password: string) => BackendResult<string>

    /**
     * @permission user
     *
     * @throws {string}
     *
     * @returns {void}
     */
    Logout: () => BackendResult<void>

    /**
     * @permission anonymous
     *
     * @param {string} pin
     *
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {AppClient}
     */
    RegisterClient: (name: string, description: string, url: string, redirecturi: string) => BackendResult<AppClient>

    /**
     * @permission oauth-provider
     *
     * @param {string} refreshToken
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    RevokeRefreshToken: (refreshToken: string) => BackendResult<boolean>

    /**
     * @permission oauth-provider
     *
     * @param {number}    userId
     * @param {string} accessToken
     * @param {number}    clientId
     * @param {string} expires
     *
     * @throws {string}
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
     * @param {number}    userId
     * @param {string} refreshToken
     * @param {number}    clientId
     * @param {string} expires
     *
     * @throws {string}
     *
     * @returns {RefreshToken|false|null}
     */
    SaveRefreshToken: (
        userId: number,
        refreshToken: string,
        clientId: number,
        expires: string
    ) => BackendResult<RefreshToken | false | null>
}
