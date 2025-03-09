/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult, ServiceResponseError, ServiceResponseSuccess } from '@/types/api'
import type { User, Users } from '@/types/validators/records'

export interface IUserService2 {
    /**
     * @permission administrator|grants
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountUsers: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} username
     * @param {string} password
     * @param {string} email
     * @param {string} fname
     * @param {string} lname
     * @param {number} membershipid
     *
     * @throws {string}
     *
     * @returns {User}
     */
    Create: (
        username: string,
        password: string,
        email: string,
        fname: string,
        lname: string,
        membershipid: number
    ) => BackendResult<User>

    /**
     * @permission grants
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {string[]}
     */
    GetGrantUserPrivileges: (userid: number) => BackendResult<string[]>

    /**
     * @permission user|administrator
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    GetStanding: (userid: number) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {unknown} [array{title: 'Active'; code: 'y'},array{title: 'Pending'; code: 't'},array{title: 'Inactive'; code: 'n'},array{title: 'Banned'; code: 'b'}]
     */
    GetStatuses: () => BackendResult<unknown>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     *
     * @throws {string}
     *
     * @returns {User|null}
     */
    GetUser: (userid: number) => BackendResult<User | null>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Users}
     */
    GetUsers: () => BackendResult<Users>

    /**
     * @permission grants
     *
     * @param {number} userid
     * @param {string} privilege
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    GrantPrivilege: (userid: number, privilege: string) => BackendResult<boolean>

    /**
     * @permission administrator|grants
     *
     * @param {number} page
     * @param {number} size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {Users}
     */
    ListUsers: (page: number, size: number, columns: string, order: string, filters: string) => BackendResult<Users>

    /**
     * @permission administrator
     *
     * @param {number}          userid
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutUserPrivileges: (userid: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission anonymous
     *
     * @param {string} username
     * @param {string} password
     * @param {string} email
     * @param {string} fname
     * @param {string} lname
     *
     * @throws {string}
     *
     * @returns {User}
     */
    Register: (username: string, password: string, email: string, fname: string, lname: string) => BackendResult<User>

    /**
     * @permission anonymous
     *
     * @param {string} email
     *
     * @throws {string}
     *
     * @returns {ServiceResponseError|ServiceResponseSuccess}
     */
    RequestPasswordReset: (email: string) => BackendResult<ServiceResponseError | ServiceResponseSuccess>

    /**
     * @permission user
     *
     * @param {string} email
     *
     * @throws {string}
     *
     * @returns {boolean|string|null}
     */
    RequestSlackInvite: (email: string) => BackendResult<boolean | string | null>

    /**
     * @permission anonymous
     *
     * @param {string} token
     * @param {string} password
     *
     * @throws {string}
     *
     * @returns {ServiceResponseError|ServiceResponseSuccess}
     */
    ResetPassword: (token: string, password: string) => BackendResult<ServiceResponseError | ServiceResponseSuccess>

    /**
     * @permission grants
     *
     * @param {number} userid
     * @param {string} privilege
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    RevokePrivilege: (userid: number, privilege: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}         userid
     * @param {boolean|string} cash
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateCash: (userid: number, cash: boolean | string) => BackendResult<boolean>

    /**
     * @permission administrator|full-profile
     *
     * @param {number} userid
     * @param {string} email
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateEmail: (userid: number, email: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} userid
     * @param {string} date
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateExpiry: (userid: number, date: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} userid
     * @param {number} membershipid
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateMembership: (userid: number, membershipid: number) => BackendResult<boolean>

    /**
     * @permission administrator|full-profile
     *
     * @param {number} userid
     * @param {string} fname
     * @param {string} lname
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateName: (userid: number, fname: string, lname: string) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number}  userid
     * @param {boolean} subscribe
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateNewsletter: (userid: number, subscribe: boolean) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     * @param {string} password
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdatePassword: (userid: number, password: string) => BackendResult<boolean>

    /**
     * @permission administrator|full-profile
     *
     * @param {number} userid
     * @param {string} email
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdatePaymentEmail: (userid: number, email: string) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} userid
     * @param {string} status
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateStatus: (userid: number, status: string) => BackendResult<boolean>

    /**
     * @permission administrator|full-profile
     *
     * @param {number} userid
     * @param {string} email
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateStripeEmail: (userid: number, email: string) => BackendResult<boolean>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     * @param {string} username
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateUsername: (userid: number, username: string) => BackendResult<boolean>
}
