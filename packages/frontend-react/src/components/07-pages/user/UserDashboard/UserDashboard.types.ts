import type { ReactNode } from 'react'

import type { LineChartProps, RevenueGoalChartProps } from '@/types/custom'
import type {
    NewMembersResult,
    TotalMembersResult,
    MetricServiceGetRevenueResult,
    MetricServiceGetMembersResult,
    MetricServiceGetCreatedDatesResult
} from '@/types/records'

export interface UserDashboardProps {
    children?: ReactNode
}

export interface UserDashboardDataState {
    newMembers?: NewMembersResult
    newMembersSince?: string
    totalMembers?: TotalMembersResult
    revenue?: MetricServiceGetRevenueResult
    members?: MetricServiceGetMembersResult
    revenueLastMonth?: MetricServiceGetRevenueResult
    revenueThisMonth?: MetricServiceGetRevenueResult
    createdDates?: MetricServiceGetCreatedDatesResult
    createdDatesLast30days?: MetricServiceGetCreatedDatesResult

    createdByDowHourChartOptions?: object
    createdByDowHour30daysChartOptions?: object
    createdByMonthDowChartOptions?: object
    revenueChartOptions?: LineChartProps
    memberChartOptions?: LineChartProps
    revenueGoalChartOptions?: RevenueGoalChartProps
}
