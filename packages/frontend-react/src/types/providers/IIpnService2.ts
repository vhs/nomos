/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { Ipn, Ipns } from '@/types/validators/records'

export interface IIpnService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountRecords: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator
     *
     * @param {number} ipnId
     *
     * @throws {string}
     *
     * @returns {Ipn}
     */
    Get: (ipnId: number) => BackendResult<Ipn>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Ipns}
     */
    GetAll: () => BackendResult<Ipns>

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
     * @returns {Ipns}
     */
    ListRecords: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<Ipns>
}
