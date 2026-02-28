/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { IMemberCardService2 } from '@/types/providers/IMemberCardService2'
import type { GenuineCard, GenuineCards } from '@/types/validators/records'

export default class MemberCardService2 implements IMemberCardService2 {
    /**
     * @permission administrator|user
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountGenuineCards(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/MemberCardService2.svc/CountGenuineCards', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    async CountUserGenuineCards(userid: number, filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/MemberCardService2.svc/CountUserGenuineCards', { userid, filters })
    }

    /**
     * @permission administrator
     *
     * @param {string} key
     *
     * @returns {GenuineCard}
     */
    async GetGenuineCardDetails(key: string): BackendResult<GenuineCard> {
        return await backendCall('/services/v2/MemberCardService2.svc/GetGenuineCardDetails', { key })
    }

    /**
     * @permission administrator
     *
     * @param {string} email
     * @param {string} key
     *
     * @returns {GenuineCard}
     */
    async IssueCard(email: string, key: string): BackendResult<GenuineCard> {
        return await backendCall('/services/v2/MemberCardService2.svc/IssueCard', { email, key })
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
     * @returns {GenuineCards}
     */
    async ListGenuineCards(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<GenuineCards> {
        return await backendCall('/services/v2/MemberCardService2.svc/ListGenuineCards', {
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
     * @param {number}      userid
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {GenuineCards}
     */
    async ListUserGenuineCards(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<GenuineCards> {
        return await backendCall('/services/v2/MemberCardService2.svc/ListUserGenuineCards', {
            userid,
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
     * @param {string} key
     * @param {string} notes
     *
     * @returns {GenuineCard}
     */
    async RegisterGenuineCard(key: string, notes: string): BackendResult<GenuineCard> {
        return await backendCall('/services/v2/MemberCardService2.svc/RegisterGenuineCard', { key, notes })
    }

    /**
     * @permission administrator
     *
     * @param {string}  key
     * @param {boolean} active
     *
     * @returns {boolean}
     */
    async UpdateGenuineCardActive(key: string, active: boolean): BackendResult<boolean> {
        return await backendCall('/services/v2/MemberCardService2.svc/UpdateGenuineCardActive', { key, active })
    }

    /**
     * @permission authenticated
     *
     * @param {string} key
     *
     * @returns {boolean}
     */
    async ValidateGenuineCard(key: string): BackendResult<boolean> {
        return await backendCall('/services/v2/MemberCardService2.svc/ValidateGenuineCard', { key })
    }

    private static _instance: MemberCardService2

    public static getInstance(): MemberCardService2 {
        if (MemberCardService2._instance == null) {
            MemberCardService2._instance = new MemberCardService2()
        }

        return MemberCardService2._instance
    }
}
