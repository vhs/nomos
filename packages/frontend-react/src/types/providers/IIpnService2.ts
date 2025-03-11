/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
import type { Ipn, Ipns } from '@/types/validators/records'

export interface IIpnService2 {
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
     * @param {number} page
     * @param {number} size
     * @param {string} columns
     * @param {string} order
     * @param {string} filters
     *
     * @throws {string}
     *
     * @returns {Ipns}
     */
    ListRecords: (page: number, size: number, columns: string, order: string, filters: string) => BackendResult<Ipns>
}
