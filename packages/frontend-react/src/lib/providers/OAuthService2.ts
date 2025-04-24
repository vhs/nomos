/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { IOAuthService2 } from '@/types/providers/IOAuthService2'
import type {
    AccessToken,
    AppClient,
    AppClients,
    RefreshToken,
    TrimmedAppClient,
    TrimmedUser,
    User
} from '@/types/validators/records'

export default class OAuthService2 implements IOAuthService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountClients(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/OAuthService2.svc/CountClients', { filters })
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
        return await backendCall('/services/v2/OAuthService2.svc/CountUserClients', { userid, filters })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @returns {void}
     */
    async DeleteClient(id: number): BackendResult<void> {
        return await backendCall('/services/v2/OAuthService2.svc/DeleteClient', { id })
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
        return await backendCall('/services/v2/OAuthService2.svc/EnableClient', { id, enabled })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} bearerToken
     *
     * @returns {AccessToken}
     */
    async GetAccessToken(bearerToken: string): BackendResult<AccessToken> {
        return await backendCall('/services/v2/OAuthService2.svc/GetAccessToken', { bearerToken })
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
        return await backendCall('/services/v2/OAuthService2.svc/GetClient', { clientId, clientSecret })
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
        return await backendCall('/services/v2/OAuthService2.svc/GetClientInfo', { clientId })
    }

    /**
     * @permission oauth-provider
     *
     * @param {string} refreshToken
     *
     * @returns {RefreshToken}
     */
    async GetRefreshToken(refreshToken: string): BackendResult<RefreshToken> {
        return await backendCall('/services/v2/OAuthService2.svc/GetRefreshToken', { refreshToken })
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
        return await backendCall('/services/v2/OAuthService2.svc/ListClients', { page, size, columns, order, filters })
    }

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
    async ListUserClients(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string | Filter | null
    ): BackendResult<AppClients> {
        return await backendCall('/services/v2/OAuthService2.svc/ListUserClients', {
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
        return await backendCall('/services/v2/OAuthService2.svc/RegisterClient', {
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
     * @throws {HttpException}
     *
     * @returns {void}
     */
    async RevokeRefreshToken(refreshToken: string): BackendResult<void> {
        return await backendCall('/services/v2/OAuthService2.svc/RevokeRefreshToken', { refreshToken })
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
        return await backendCall('/services/v2/OAuthService2.svc/SaveAccessToken', {
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
     * @throws {HttpException}
     *
     * @returns {TrimmedUser}
     */
    async SaveRefreshToken(
        userId: number,
        refreshToken: string,
        clientId: number,
        expires: string
    ): BackendResult<TrimmedUser> {
        return await backendCall('/services/v2/OAuthService2.svc/SaveRefreshToken', {
            userId,
            refreshToken,
            clientId,
            expires
        })
    }

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
    async UpdateClient(
        id: number,
        name: string,
        description: string,
        url: string,
        redirecturi: string
    ): BackendResult<boolean> {
        return await backendCall('/services/v2/OAuthService2.svc/UpdateClient', {
            id,
            name,
            description,
            url,
            redirecturi
        })
    }

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
    async UpdateClientExpiry(id: number, expires: string): BackendResult<boolean> {
        return await backendCall('/services/v2/OAuthService2.svc/UpdateClientExpiry', { id, expires })
    }

    private static _instance: OAuthService2

    public static getInstance(): OAuthService2 {
        if (OAuthService2._instance == null) {
            OAuthService2._instance = new OAuthService2()
        }

        return OAuthService2._instance
    }
}
