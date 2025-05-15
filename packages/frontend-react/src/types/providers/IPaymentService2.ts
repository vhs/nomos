/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { Payment, Payments } from '@/types/validators/records'

export interface IPaymentService2 {
    /**
     * @permission administrator|user
     *
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountPayments: (filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number}      userid
     * @param {Filter|null} filters
     *
     * @returns {number}
     */
    CountUserPayments: (userid: number, filters: Filter | null) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @returns {Payment|null}
     */
    GetPayment: (id: number) => BackendResult<Payment | null>

    /**
     * @permission administrator
     *
     * @param {number}      page
     * @param {number}      size
     * @param {string}      columns
     * @param {string}      order
     * @param {Filter|null} filters
     *
     * @returns {Payments}
     */
    ListPayments: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<Payments>

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
     * @returns {Payments}
     */
    ListUserPayments: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ) => BackendResult<Payments>

    /**
     * @permission administrator
     *
     * @param {number} paymentid
     *
     * @returns {string}
     */
    ReplayPaymentProcessing: (paymentid: number) => BackendResult<string>
}
