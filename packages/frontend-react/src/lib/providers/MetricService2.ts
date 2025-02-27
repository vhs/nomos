/* eslint-disable @typescript-eslint/naming-convention */

import { backendCall } from '@/lib/backend'
import type User from '@/lib/db/User'

import type { BackendResult } from '@/types/custom'
import type { IMetricService2 } from '@/types/providers/IMetricService2'
import type {
    MetricServiceGetCreatedDatesResult,
    MetricServiceGetMembersResult,
    MetricServiceGetRevenueResult,
    MetricServiceGroupType,
    NewMembersResult,
    Payments,
    TotalKeyHoldersResult,
    TotalMembersResult
} from '@/types/records'

export default class MetricService2 implements IMetricService2 {
    async GetCreatedDates(start_range: string, end_range: string): BackendResult<MetricServiceGetCreatedDatesResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetCreatedDates', { start_range, end_range })
    }
    async GetExceptionPayments(): BackendResult<Payments> {
        return await backendCall('/services/v2/MetricService2.svc/GetExceptionPayments', {})
    }
    async GetMembers(
        start_range: string,
        end_range: string,
        group: MetricServiceGroupType
    ): BackendResult<MetricServiceGetMembersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetMembers', { start_range, end_range, group })
    }
    async GetNewKeyHolders(start_range: string, end_range: string): BackendResult<unknown> {
        return await backendCall('/services/v2/MetricService2.svc/GetNewKeyHolders', { start_range, end_range })
    }
    async GetNewMembers(start_range: string, end_range: string): BackendResult<NewMembersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetNewMembers', { start_range, end_range })
    }
    async GetPendingAccounts(): BackendResult<User[]> {
        return await backendCall('/services/v2/MetricService2.svc/GetPendingAccounts', {})
    }
    async GetRevenue(
        start_range: string,
        end_range: string,
        group: MetricServiceGroupType
    ): BackendResult<MetricServiceGetRevenueResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetRevenue', { start_range, end_range, group })
    }
    async GetTotalKeyHolders(): BackendResult<TotalKeyHoldersResult> {
        return await backendCall('/services/v2/MetricService2.svc/GetTotalKeyHolders', {})
    }
    async GetTotalMembers(): BackendResult<TotalMembersResult> {
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
