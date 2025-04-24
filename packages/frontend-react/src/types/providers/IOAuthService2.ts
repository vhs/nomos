/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type {
    AccessToken,
    AppClient,
    AppClients,
    RefreshToken,
    TrimmedAppClient,
    TrimmedUser,
    User
} from '@/types/validators/records'

export interface IOAuthService2 {
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
    CountUserClients: (userid: number, filters: Filter | null) => BackendResult<number>

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
     * @param {number}             userid
     * @param {number}             page
     * @param {number}             size
     * @param {string}             columns
     * @param {string}             order
     * @param {string|Filter|null} filters
     *
     * @throws {UnauthorizedException}
     *
     * @returns {AppClients}
     */
    ListUserClients: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string | Filter | null
    ) => BackendResult<AppClients>

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
     * @throws {HttpException}
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
     * @throws {HttpException}
     *
     * @returns {TrimmedUser}
     */
    SaveRefreshToken: (
        userId: number,
        refreshToken: string,
        clientId: number,
        expires: string
    ) => BackendResult<TrimmedUser>

    /**
     * @permission administrator|user
     *
     * @param {number} id
     * @param {string} name
     * @param {string} description
     * @param {string} url
     * @param {string} redirecturi
     *
     * @throws {HttpException}
     *
     * @returns {boolean}
     */
    UpdateClient: (
        id: number,
        name: string,
        description: string,
        url: string,
        redirecturi: string
    ) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} id
     * @param {string} expires
     *
     * @throws {HttpException}
     *
     * @returns {boolean}
     */
    UpdateClientExpiry: (id: number, expires: string) => BackendResult<boolean>
}
