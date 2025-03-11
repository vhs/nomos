/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'
import type { Filter } from '@/lib/db/utils/query-filters'

import type { BackendResult } from '@/types/api'
import type { IIpnService2 } from '@/types/providers/IIpnService2'
import type { Ipn, Ipns } from '@/types/validators/records'

export default class IpnService2 implements IIpnService2 {
    /**
     * @permission administrator
     *
     * @param {Filter|null} filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountRecords(filters: Filter | null): BackendResult<number> {
        return await backendCall('/services/v2/IpnService2.svc/CountRecords', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {number} ipnId
     *
     * @throws {string}
     *
     * @returns {Ipn}
     */
    async Get(ipnId: number): BackendResult<Ipn> {
        return await backendCall('/services/v2/IpnService2.svc/Get', { ipnId })
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Ipns}
     */
    async GetAll(): BackendResult<Ipns> {
        return await backendCall('/services/v2/IpnService2.svc/GetAll', {})
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
     * @throws {string}
     *
     * @returns {Ipns}
     */
    async ListRecords(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: Filter | null
    ): BackendResult<Ipns> {
        return await backendCall('/services/v2/IpnService2.svc/ListRecords', { page, size, columns, order, filters })
    }

    private static _instance: IpnService2

    public static getInstance(): IpnService2 {
        if (IpnService2._instance == null) {
            IpnService2._instance = new IpnService2()
        }

        return IpnService2._instance
    }
}
