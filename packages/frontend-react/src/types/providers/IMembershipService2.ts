/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { Membership, Memberships } from '@/types/validators/records'

export interface IMembershipService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountMemberships: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} title
     * @param {string} description
     * @param {number} price
     * @param {string} code
     * @param {string} days
     * @param {string} period
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
     * @returns {Membership}
     */
    Get: (membershipId: number) => BackendResult<Membership>

    /**
     * @permission administrator
     *
     * @returns {Memberships}
     */
    GetAll: () => BackendResult<Memberships>

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {Memberships}
     */
    ListMemberships: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<Memberships>

    /**
     * @permission administrator
     *
     * @param {number}          membershipId
     * @param {string|string[]} privileges
     *
     * @returns {boolean}
     */
    PutPrivileges: (membershipId: number, privileges: string | string[]) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number} membershipId
     * @param {string} title
     * @param {string} description
     * @param {number} price
     * @param {string} code
     * @param {number} days
     * @param {string} period
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
     * @returns {boolean}
     */
    UpdateActive: (membershipId: number, active: boolean) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} privateVal
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
     * @returns {boolean}
     */
    UpdateRecurring: (membershipId: number, recurring: boolean) => BackendResult<boolean>

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} trial
     *
     * @returns {boolean}
     */
    UpdateTrial: (membershipId: number, trial: boolean) => BackendResult<boolean>
}
