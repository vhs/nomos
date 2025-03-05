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
     * @throws {string}
     *
     * @returns {MetricServiceGetCreatedDatesResult}
     */
    GetCreatedDates: (start_range: string, end_range: string) => BackendResult<MetricServiceGetCreatedDatesResult>

    /**
     * @permission administrator
     *
     * @throws {string}
     *
     * @returns {Payments}
     */
    GetExceptionPayments: () => BackendResult<Payments>

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
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {MetricServiceNewMembersResult}
     */
    GetNewMembers: (start_range: string, end_range: string) => BackendResult<MetricServiceNewMembersResult>

    /**
     * @permission administrator
     *
     * @throws {string}
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
     * @throws {string}
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
     * @throws {string}
     *
     * @returns {MetricServiceTotalKeyHoldersResult}
     */
    GetTotalKeyHolders: () => BackendResult<MetricServiceTotalKeyHoldersResult>

    /**
     * @permission user
     *
     * @throws {string}
     *
     * @returns {MetricServiceTotalMembersResult}
     */
    GetTotalMembers: () => BackendResult<MetricServiceTotalMembersResult>
}
