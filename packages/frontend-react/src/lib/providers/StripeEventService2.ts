/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IStripeEventService2 } from '@/types/providers/IStripeEventService2'
import type { StripeEvent, StripeEvents } from '@/types/validators/records'

export default class StripeEventService2 implements IStripeEventService2 {
    /**
     * @permission administrator
     *
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountRecords(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/StripeEventService2.svc/CountRecords', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {number} eventId
     *
     * @throws {string}
     *
     * @returns {StripeEvent}
     */
    async Get(eventId: number): BackendResult<StripeEvent> {
        return await backendCall('/services/v2/StripeEventService2.svc/Get', { eventId })
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {StripeEvents}
     */
    async GetAll(): BackendResult<StripeEvents> {
        return await backendCall('/services/v2/StripeEventService2.svc/GetAll', {})
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
     * @returns {StripeEvents}
     */
    async ListRecords(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<StripeEvents> {
        return await backendCall('/services/v2/StripeEventService2.svc/ListRecords', {
            page,
            size,
            columns,
            order,
            filters
        })
    }

    private static _instance: StripeEventService2

    public static getInstance(): StripeEventService2 {
        if (StripeEventService2._instance == null) {
            StripeEventService2._instance = new StripeEventService2()
        }

        return StripeEventService2._instance
    }
}
