/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { GenuineCard, GenuineCards } from '@/types/validators/records'

export interface IMemberCardService2 {
    /**
     * @permission administrator|user
     *
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountGenuineCards: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @throws {Exception}
     * @throws {string}
     *
     * @returns {number}
     */
    CountUserGenuineCards: (userid: number, filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {string} key
     *
     * @throws {string}
     *
     * @returns {GenuineCard}
     */
    GetGenuineCardDetails: (key: string) => BackendResult<GenuineCard>

    /**
     * @permission administrator
     *
     * @param {string} email
     * @param {string} key
     *
     * @throws {Exception}
     * @throws {string}
     *
     * @returns {GenuineCard}
     */
    IssueCard: (email: string, key: string) => BackendResult<GenuineCard>

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {GenuineCards}
     */
    ListGenuineCards: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<GenuineCards>

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
     * @throws {Exception}
     * @throws {string}
     *
     * @returns {GenuineCards}
     */
    ListUserGenuineCards: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<GenuineCards>

    /**
     * @permission administrator
     *
     * @param {string} key
     * @param {string} notes
     *
     * @throws {Exception}
     * @throws {string}
     *
     * @returns {GenuineCard}
     */
    RegisterGenuineCard: (key: string, notes: string) => BackendResult<GenuineCard>

    /**
     * @permission administrator
     *
     * @param {string} key
     * @param {string} active
     *
     * @throws {Exception}
     * @throws {string}
     *
     * @returns {boolean}
     */
    UpdateGenuineCardActive: (key: string, active: string) => BackendResult<boolean>

    /**
     * @permission authenticated
     *
     * @param {string} key
     *
     * @throws {string}
     *
     * @returns {boolean}
     */
    ValidateGenuineCard: (key: string) => BackendResult<boolean>
}
