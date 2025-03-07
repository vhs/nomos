/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IPaymentService2 } from '@/types/providers/IPaymentService2'
import type { Payment, Payments } from '@/types/validators/records'

export default class PaymentService2 implements IPaymentService2 {
    /**
     * @permission administrator|user
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountPayments(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/PaymentService2.svc/CountPayments', { filters })
    }

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
    async CountUserPayments(userid: number, filters: string): BackendResult<number> {
        return await backendCall('/services/v2/PaymentService2.svc/CountUserPayments', { userid, filters })
    }

    /**
     * @permission administrator|user
     *
     * @param {number} id
     *
     * @throws {string}
     *
     * @returns {Payment|null}
     */
    async GetPayment(id: number): BackendResult<Payment | null> {
        return await backendCall('/services/v2/PaymentService2.svc/GetPayment', { id })
    }

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
    async ListPayments(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<Payments> {
        return await backendCall('/services/v2/PaymentService2.svc/ListPayments', {
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
    async ListUserPayments(
        userid: number,
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<Payments> {
        return await backendCall('/services/v2/PaymentService2.svc/ListUserPayments', {
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
     * @param {number} paymentid
     *
     * @throws {string}
     *
     * @returns {string}
     */
    async ReplayPaymentProcessing(paymentid: number): BackendResult<string> {
        return await backendCall('/services/v2/PaymentService2.svc/ReplayPaymentProcessing', { paymentid })
    }

    private static _instance: PaymentService2

    public static getInstance(): PaymentService2 {
        if (PaymentService2._instance == null) {
            PaymentService2._instance = new PaymentService2()
        }

        return PaymentService2._instance
    }
}
