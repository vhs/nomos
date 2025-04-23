/* eslint-disable @typescript-eslint/naming-convention */
// Do not change manually.

import type { BackendResult } from '@/types/api'
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

export interface IMetricService2 {
    /**
     * @permission user
     *
     * @param {string} start_range
     * @param {string} end_range
     *
     * @returns {MetricServiceGetCreatedDatesResult}
     */
    GetCreatedDates: (start_range: string, end_range: string) => BackendResult<MetricServiceGetCreatedDatesResult>

    /**
     * @permission administrator
     *
     * @returns {Payments}
     */
    GetExceptionPayments: () => BackendResult<Payments>

    /**
     * @permission user
     *
     * @param {string}                 start_range
     * @param {string}                 end_range
     * @param {MetricServiceGroupType} group
     *
     * @returns {MetricServiceGetMembersResult}
     */
    GetMembers: (
        start_range: string,
        end_range: string,
        group: MetricServiceGroupType
    ) => BackendResult<MetricServiceGetMembersResult>

    /**
     * @permission user
     *
     * @param {string} start_range string iso date in UTC, if empty is start of today
     * @param {string} end_range   string iso date in UTC, if empty is end of today
     *
     * @returns {MetricServiceNewKeyholdersResult}
     */
    GetNewKeyHolders: (start_range: string, end_range: string) => BackendResult<MetricServiceNewKeyholdersResult>

    /**
     * @permission user
     *
     * @param {string} start_range string iso date in UTC, if empty is start of today
     * @param {string} end_range   string iso date in UTC, if empty is end of today
     *
     * @returns {MetricServiceNewMembersResult}
     */
    GetNewMembers: (start_range: string, end_range: string) => BackendResult<MetricServiceNewMembersResult>

    /**
     * @permission administrator
     *
     * @returns {Users}
     */
    GetPendingAccounts: () => BackendResult<Users>

    /**
     * @permission user
     *
     * @param {string}                 start_range string iso date in UTC, if empty is end of today
     * @param {string}                 end_range   string iso date in UTC, if empty is end of today
     * @param {MetricServiceGroupType} group       group by month, day, year
     *
     * @returns {MetricServiceGetRevenueResult}
     */
    GetRevenue: (
        start_range: string,
        end_range: string,
        group: MetricServiceGroupType
    ) => BackendResult<MetricServiceGetRevenueResult>

    /**
     * @permission user
     *
     * @returns {MetricServiceTotalKeyHoldersResult}
     */
    GetTotalKeyHolders: () => BackendResult<MetricServiceTotalKeyHoldersResult>

    /**
     * @permission user
     *
     * @returns {MetricServiceTotalMembersResult}
     */
    GetTotalMembers: () => BackendResult<MetricServiceTotalMembersResult>
}
