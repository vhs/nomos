/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */

import { backendCall } from '@/lib/backend'
import type User from '@/lib/db/User'

import type { BackendResult, ServiceResponseError, ServiceResponseSuccess } from '@/types/custom'
import type { IUserService2 } from '@/types/providers/IUserService2'

export default class UserService2 implements IUserService2 {
    /**
     * @permission administrator|grants
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountUsers(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/UserService2.svc/CountUsers', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {string} $username
     * @param {string} $password
     * @param {string} $email
     * @param {string} $fname
     * @param {string} $lname
     * @param {number}    $membershipid
     *
     * @throws {string}
     *
     * @returns {User}
     */
    async Create(
        username: string,
        password: string,
        email: string,
        fname: string,
        lname: string,
        membershipid: number
    ): BackendResult<User> {
        return await backendCall('/services/v2/UserService2.svc/Create', {
            username,
            password,
            email,
            fname,
            lname,
            membershipid
        })
    }

    /**
     * @permission grants
     *
     * @param {number} $userid
     *
     * @throws {string}
     *
     * @returns {string[]}
     */
    async GetGrantUserPrivileges(userid: number): BackendResult<string[]> {
        return await backendCall('/services/v2/UserService2.svc/GetGrantUserPrivileges', { userid })
    }

    /**
     * @permission user|administrator
     *
     * @param {number} $userid
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async GetStanding(userid: number): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/GetStanding', { userid })
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {unknown[]}
     */
    async GetStatuses(): BackendResult<unknown[]> {
        return await backendCall('/services/v2/UserService2.svc/GetStatuses')
    }

    /**
     * @permission administrator|user
     *
     * @param {number} $userid
     *
     * @throws {string}
     *
     * @returns {User|null}
     */
    async GetUser(userid: number): BackendResult<User | null> {
        return await backendCall('/services/v2/UserService2.svc/GetUser', { userid })
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {User[]}
     */
    async GetUsers(): BackendResult<User[]> {
        return await backendCall('/services/v2/UserService2.svc/GetUsers')
    }

    /**
     * @permission grants
     *
     * @param {number}    $userid
     * @param {string} $privilege
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async GrantPrivilege(userid: number, privilege: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/GrantPrivilege', {
            userid,
            privilege
        })
    }

    /**
     * @permission administrator|grants
     *
     * @param {number}    $page
     * @param {number}    $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {User[]}
     */
    async ListUsers(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<User[]> {
        return await backendCall('/services/v2/UserService2.svc/ListUsers', {
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
     * @param {number}    $userid
     * @param {string|string[]} $privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async PutUserPrivileges(userid: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/PutUserPrivileges', {
            userid,
            privileges
        })
    }

    /**
     * @permission anonymous
     *
     * @param {string} $username
     * @param {string} $password
     * @param {string} $email
     * @param {string} $fname
     * @param {string} $lname
     *
     * @throws {string}
     *
     * @returns {User}
     */
    async Register(
        username: string,
        password: string,
        email: string,
        fname: string,
        lname: string
    ): BackendResult<User> {
        return await backendCall('/services/v2/UserService2.svc/Register', {
            username,
            password,
            email,
            fname,
            lname
        })
    }

    /**
     * @permission anonymous
     *
     * @param {string} $email
     *
     * @throws {string}
     *
     * @returns {ServiceResponseError|ServiceResponseSuccess}
     */
    async RequestPasswordReset(email: string): BackendResult<ServiceResponseError | ServiceResponseSuccess> {
        return await backendCall('/services/v2/UserService2.svc/RequestPasswordReset', { email })
    }

    /**
     * @permission user
     *
     * @param {string} $email
     *
     * @throws {string}
     *
     * @returns {boolean|string|null}
     */
    async RequestSlackInvite(email: string): BackendResult<boolean | string | null> {
        return await backendCall('/services/v2/UserService2.svc/RequestSlackInvite', { email })
    }

    /**
     * @permission anonymous
     *
     * @param {string} $token
     * @param {string} $password
     *
     * @throws {string}
     *
     * @returns {ServiceResponseError|ServiceResponseSuccess}
     */
    async ResetPassword(token: string, password: string): BackendResult<ServiceResponseError | ServiceResponseSuccess> {
        return await backendCall('/services/v2/UserService2.svc/ResetPassword', {
            token,
            password
        })
    }

    /**
     * @permission grants
     *
     * @param {number}    $userid
     * @param {string} $privilege
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async RevokePrivilege(userid: number, privilege: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/RevokePrivilege', {
            userid,
            privilege
        })
    }

    /**
     * @permission administrator
     *
     * @param {number}    $userid
     * @param {boolean} $cash
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateCash(userid: number, cash: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateCash', { userid, cash })
    }

    /**
     * @permission administrator|full-profile
     *
     * @param {number}    $userid
     * @param {string} $email
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateEmail(userid: number, email: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateEmail', { userid, email })
    }

    /**
     * @permission administrator
     *
     * @param {number}    $userid
     * @param {string} $date
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateExpiry(userid: number, date: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateExpiry', { userid, date })
    }

    /**
     * @permission administrator
     *
     * @param {number} $userid
     * @param {number} $membershipid
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateMembership(userid: number, membershipid: number): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateMembership', {
            userid,
            membershipid
        })
    }

    /**
     * @permission administrator|full-profile
     *
     * @param {number}    $userid
     * @param {string} $fname
     * @param {string} $lname
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateName(userid: number, fname: string, lname: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateName', {
            userid,
            fname,
            lname
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}    $userid
     * @param {boolean} $subscribe
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateNewsletter(userid: number, subscribe: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateNewsletter', {
            userid,
            subscribe
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}    $userid
     * @param {string} $password
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdatePassword(userid: number, password: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdatePassword', {
            userid,
            password
        })
    }

    /**
     * @permission administrator|full-profile
     *
     * @param {number}    $userid
     * @param {string} $email
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdatePaymentEmail(userid: number, email: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdatePaymentEmail', {
            userid,
            email
        })
    }

    /**
     * @permission administrator
     *
     * @param {number}    $userid
     * @param {string} $status
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateStatus(userid: number, status: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateStatus', { userid, status })
    }

    /**
     * @permission administrator|full-profile
     *
     * @param {number}    $userid
     * @param {string} $email
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateStripeEmail(userid: number, email: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateStripeEmail', {
            userid,
            email
        })
    }

    /**
     * @permission administrator|user
     *
     * @param {number}    $userid
     * @param {string} $username
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    async UpdateUsername(userid: number, username: string): BackendResult<boolean> {
        return await backendCall('/services/v2/UserService2.svc/UpdateUsername', {
            userid,
            username
        })
    }

    private static _instance: UserService2

    public static getInstance(): UserService2 {
        if (UserService2._instance == null) {
            UserService2._instance = new UserService2()
        }

        return UserService2._instance
    }
}
