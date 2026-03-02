/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type {
    AccessLogs,
    AnonPrincipal,
    AuthCheckResult,
    IPrincipal,
    TrimmedUser,
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
     * @param {string|Filter|null} filters
     *
     * @returns {number}
     */
    CountAccessLog: (filters: string | Filter | null) => BackendResult<number>

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
     * @permission anonymous
     *
     * @returns {UserPrincipal|AnonPrincipal|IPrincipal}
     */
    CurrentUser: () => BackendResult<UserPrincipal | AnonPrincipal | IPrincipal>

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
     * @param {number}             page
     * @param {number}             size
     * @param {string}             columns
     * @param {string}             order
     * @param {string|Filter|null} filters
     *
     * @returns {AccessLogs}
     */
    ListAccessLog: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string | Filter | null
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
     * @throws {HttpException}
     *
     * @returns {string}
     */
    PinLogin: (pin: string) => BackendResult<string>

    /**
     * @permission anonymous
     *
     * @param {string} key
     *
     * @throws {HttpException}
     *
     * @returns {string}
     */
    RfidLogin: (key: string) => BackendResult<string>
}
