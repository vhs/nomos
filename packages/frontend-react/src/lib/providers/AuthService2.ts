/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { IAuthService2 } from '@/types/providers/IAuthService2'
import type {
    AccessLogs,
    AnonPrincipal,
    AuthCheckResult,
    IPrincipal,
    TrimmedUser,
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
     * @param {string|Filter|null} filters
     *
     * @returns {number}
     */
    async CountAccessLog(filters: string | Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/AuthService2.svc/CountAccessLog', { filters })
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
     * @permission anonymous
     *
     * @returns {UserPrincipal|AnonPrincipal|IPrincipal}
     */
    async CurrentUser(): BackendResult<UserPrincipal | AnonPrincipal | IPrincipal> {
        return await backendCall('/services/v2/AuthService2.svc/CurrentUser', {})
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
     * @param {number}             page
     * @param {number}             size
     * @param {string}             columns
     * @param {string}             order
     * @param {string|Filter|null} filters
     *
     * @returns {AccessLogs}
     */
    async ListAccessLog(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string | Filter | null
    ): BackendResult<AccessLogs> {
        return await backendCall('/services/v2/AuthService2.svc/ListAccessLog', { page, size, columns, order, filters })
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
     * @throws {HttpException}
     *
     * @returns {string}
     */
    async PinLogin(pin: string): BackendResult<string> {
        return await backendCall('/services/v2/AuthService2.svc/PinLogin', { pin })
    }

    /**
     * @permission anonymous
     *
     * @param {string} key
     *
     * @throws {HttpException}
     *
     * @returns {string}
     */
    async RfidLogin(key: string): BackendResult<string> {
        return await backendCall('/services/v2/AuthService2.svc/RfidLogin', { key })
    }

    private static _instance: AuthService2

    public static getInstance(): AuthService2 {
        if (AuthService2._instance == null) {
            AuthService2._instance = new AuthService2()
        }

        return AuthService2._instance
    }
}
