/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Payment, Payments } from '@/types/validators/records'

export interface IPaymentService2 {
    /**
     * @permission administrator|user
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountPayments: (filters: string) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    CountUserPayments: (userid: number, filters: string) => BackendResult<number>

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {Payment|null}
     */
    GetPayment: (id: number) => BackendResult<Payment | null>

    /**
     * @permission administrator
     *
     * @param {number} page
     * @param {number} size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {Payments}
     */
    ListPayments: (
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<Payments>

    /**
     * @permission administrator|user
     *
     * @param {number} userid
     * @param {number} page
     * @param {number} size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {Payments}
     */
    ListUserPayments: (
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ) => BackendResult<Payments>

    /**
     * @permission administrator
     *
     * @param {number} paymentid
     *
     * @throws {string}
     *
     * @returns {string}
     */
    ReplayPaymentProcessing: (paymentid: number) => BackendResult<string>
}
