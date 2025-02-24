/* eslint-disable @typescript-eslint/max-params */
/* eslint-disable @typescript-eslint/naming-convention */

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/custom'
import type { IIpnService2 } from '@/types/providers/IIpnService2'
import type { Ipn } from '@/types/records'

export default class IpnService2 implements IIpnService2 {
    /**
     * @permission administrator
     *
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {number}
     */
    async CountRecords(filters: string): BackendResult<number> {
        return await backendCall('/services/v2/IpnService2.svc/CountRecords', { filters })
    }

    /**
     * @permission administrator
     *
     * @param {number} $ipnId
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
     * @returns {Ipn[]}
     */
    async GetAll(): BackendResult<Ipn[]> {
        return await backendCall('/services/v2/IpnService2.svc/GetAll')
    }

    /**
     * @permission administrator
     *
     * @param {number} $page
     * @param {number} $size
     * @param {string} $columns
     * @param {string} $order
     * @param {string} $filters
     *
     * @throws {string}
     *
     * @returns {Ipn[]}
     */
    async ListRecords(
        page: number,
        size: number,
        columns: string,
        order: string,
        filters: string
    ): BackendResult<Ipn[]> {
        return await backendCall('/services/v2/IpnService2.svc/ListRecords', {
            page,
            size,
            columns,
            order,
            filters
        })
    }

    private static _instance: IpnService2

    public static getInstance(): IpnService2 {
        if (IpnService2._instance == null) {
            IpnService2._instance = new IpnService2()
        }

        return IpnService2._instance
    }
}
