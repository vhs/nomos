/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Membership, Memberships } from '@/types/validators/records'

export interface IMembershipService2 {
    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountMemberships: (filters: string) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} title
     * @param {string} description
     * @param {number}    price
     * @param {string} code
     * @param {string} days
     * @param {string} period
     *
     * @throws {string}
     *
     * @returns {void}
     */
    Create: (
        title: string,
        description: string,
        price: number,
        code: string,
        days: string,
        period: string
    ) => BackendResult<void>

    /**
     * @permission administrator
     *
     * @param {number} membershipId
     *
     * @throws {string}
     *
     * @returns {Membership}
     */
    Get: (membershipId: number) => BackendResult<Membership>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Memberships}
     */
    GetAll: () => BackendResult<Memberships>

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
     * @returns {Memberships}
     */
    ListMemberships: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<Memberships>

    /**
     * @permission administrator
     *
     * @param {number}             membershipId
     * @param {string|string[]} privileges
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    PutPrivileges: (membershipId: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}    membershipId
     * @param {string} title
     * @param {string} description
     * @param {number}    price
     * @param {string} code
     * @param {number}    days
     * @param {string} period
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    Update: (
        membershipId: number,
        title: string,
        description: string,
        price: number,
        code: string,
        days: number,
        period: string
    ) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} active
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateActive: (membershipId: number, active: boolean) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} privateVal
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdatePrivate: (membershipId: number, privateVal: boolean) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} recurring
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateRecurring: (membershipId: number, recurring: boolean) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} trial
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateTrial: (membershipId: number, trial: boolean) => BackendResult<boolean>
}
