/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { StripeEvent, StripeEvents } from '@/types/validators/records'

export interface IStripeEventService2 {
    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountRecords: (filters: string) => BackendResult<number>

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
     * @param {number}    page
     * @param {number}    size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
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
        filters: string
    ) => BackendResult<StripeEvents>
}
