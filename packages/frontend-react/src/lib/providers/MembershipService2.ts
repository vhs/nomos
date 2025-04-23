/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { IMembershipService2 } from '@/types/providers/IMembershipService2'
import type { Membership, Memberships } from '@/types/validators/records'

export default class MembershipService2 implements IMembershipService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountMemberships(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/MembershipService2.svc/CountMemberships', { filters })
    }

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
    async Create(
        title: string,
        description: string,
        price: number,
        code: string,
        days: string,
        period: string
    ): BackendResult<void> {
        return await backendCall('/services/v2/MembershipService2.svc/Create', {
            title,
            description,
            price,
            code,
            days,
            period
        })
    }

    /**
     * @permission administrator
     *
     * @param {number} membershipId
     *
     * @returns {Membership}
     */
    async Get(membershipId: number): BackendResult<Membership> {
        return await backendCall('/services/v2/MembershipService2.svc/Get', { membershipId })
    }

    /**
     * @permission administrator
     *
     * @returns {Memberships}
     */
    async GetAll(): BackendResult<Memberships> {
        return await backendCall('/services/v2/MembershipService2.svc/GetAll', {})
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
     * @returns {Memberships}
     */
    async ListMemberships(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<Memberships> {
        return await backendCall('/services/v2/MembershipService2.svc/ListMemberships', {
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
     * @param {number}          membershipId
     * @param {string|string[]} privileges
     *
     * @returns {boolean}
     */
    async PutPrivileges(membershipId: number, privileges: string | string[]): BackendResult<boolean> {
        return await backendCall('/services/v2/MembershipService2.svc/PutPrivileges', { membershipId, privileges })
    }

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
    async Update(
        membershipId: number,
        title: string,
        description: string,
        price: number,
        code: string,
        days: number,
        period: string
    ): BackendResult<boolean> {
        return await backendCall('/services/v2/MembershipService2.svc/Update', {
            membershipId,
            title,
            description,
            price,
            code,
            days,
            period
        })
    }

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} active
     *
     * @returns {boolean}
     */
    async UpdateActive(membershipId: number, active: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/MembershipService2.svc/UpdateActive', { membershipId, active })
    }

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} privateVal
     *
     * @returns {boolean}
     */
    async UpdatePrivate(membershipId: number, privateVal: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/MembershipService2.svc/UpdatePrivate', { membershipId, privateVal })
    }

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} recurring
     *
     * @returns {boolean}
     */
    async UpdateRecurring(membershipId: number, recurring: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/MembershipService2.svc/UpdateRecurring', { membershipId, recurring })
    }

    /**
     * @permission administrator
     *
     * @param {number}  membershipId
     * @param {boolean} trial
     *
     * @returns {boolean}
     */
    async UpdateTrial(membershipId: number, trial: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/MembershipService2.svc/UpdateTrial', { membershipId, trial })
    }

    private static _instance: MembershipService2

    public static getInstance(): MembershipService2 {
        if (MembershipService2._instance == null) {
            MembershipService2._instance = new MembershipService2()
        }

        return MembershipService2._instance
    }
}
