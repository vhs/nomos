/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import { backendCall } from '@/lib/backend'

import type { BackendResult } from '@/types/api'
import type { IMetricService2 } from '@/types/providers/IMetricService2'
import type {
    MetricServiceGetCreatedDatesResult,
    MetricServiceGetMembersResult,
    MetricServiceGetRevenueResult,
    MetricServiceGroupType,
    MetricServiceNewKeyholdersResult,
    MetricServiceNewMembersResult,
    MetricServiceTotalKeyHoldersResult,
    MetricServiceTotalMembersResult,
    Payments,
    Users
} from '@/types/validators/records'

export default class MetricService2 implements IMetricService2 {
    /**
     * @permission user
     *
     * @param {string} start_range
     * @param {string} end_range
     *
     * @throws {string}
     *
     * @returns {MetricServiceGetCreatedDatesResult}
     */
    async GetCreatedDates(start_range: string, end_range: string): BackendResult<MetricServiceGetCreatedDatesResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetCreatedDates', { start_range, end_range })
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Payments}
     */
    async GetExceptionPayments(): BackendResult<Payments> {
        return await backendCall('/services/v2/MetricService2.svc/GetExceptionPayments', {})
    }

    /**
     * @permission user
     *
     * @param {string}                            start_range
     * @param {string}                            end_range
     * @param {MetricServiceGroupType} group
     *
     * @throws {string}
     *
     * @returns {MetricServiceGetMembersResult}
     */
    async GetMembers(
        start_range: string,
        end_range: string,
        group: MetricServiceGroupType
    ): BackendResult<MetricServiceGetMembersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetMembers', { start_range, end_range, group })
    }

    /**
     * @permission user
     *
     * @param {string} start_range string iso date in UTC, if empty is start of today
     * @param {string} end_range   string iso date in UTC, if empty is end of today
     *
     * @throws {string}
     *
     * @returns {MetricServiceNewKeyholdersResult}
     */
    async GetNewKeyHolders(start_range: string, end_range: string): BackendResult<MetricServiceNewKeyholdersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetNewKeyHolders', { start_range, end_range })
    }

    /**
     * @permission user
     *
     * @param {string} start_range string iso date in UTC, if empty is start of today
     * @param {string} end_range   string iso date in UTC, if empty is end of today
     *
     * @throws {string}
     *
     * @returns {MetricServiceNewMembersResult}
     */
    async GetNewMembers(start_range: string, end_range: string): BackendResult<MetricServiceNewMembersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetNewMembers', { start_range, end_range })
    }

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Users}
     */
    async GetPendingAccounts(): BackendResult<Users> {
        return await backendCall('/services/v2/MetricService2.svc/GetPendingAccounts', {})
    }

    /**
     * @permission user
     *
     * @param {string}                 start_range string iso date in UTC, if empty is end of today
     * @param {string}                 end_range   string iso date in UTC, if empty is end of today
     * @param {MetricServiceGroupType} group       group by month, day, year
     *
     * @throws {string}
     *
     * @returns {MetricServiceGetRevenueResult}
     */
    async GetRevenue(
        start_range: string,
        end_range: string,
        group: MetricServiceGroupType
    ): BackendResult<MetricServiceGetRevenueResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetRevenue', { start_range, end_range, group })
    }

    /**
     * @permission user
     *
     * @throws {string}
     *
     * @returns {MetricServiceTotalKeyHoldersResult}
     */
    async GetTotalKeyHolders(): BackendResult<MetricServiceTotalKeyHoldersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetTotalKeyHolders', {})
    }

    /**
     * @permission user
     *
     * @throws {string}
     *
     * @returns {MetricServiceTotalMembersResult}
     */
    async GetTotalMembers(): BackendResult<MetricServiceTotalMembersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetTotalMembers', {})
    }

    private static _instance: MetricService2

    public static getInstance(): MetricService2 {
        if (MetricService2._instance == null) {
            MetricService2._instance = new MetricService2()
        }

        return MetricService2._instance
    }
}
