/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { StripeEvent, StripeEvents } from '@/types/validators/records'

export interface IStripeEventService2 {
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
     * @param {number} eventId
     *
     * @throws {string}
     *
     * @returns {StripeEvent}
     */
    Get: (eventId: number) => BackendResult<StripeEvent>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {StripeEvents}
     */
    GetAll: () => BackendResult<StripeEvents>

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
     * @returns {StripeEvents}
     */
    ListRecords: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<StripeEvents>
}
