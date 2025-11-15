import type { ReactNode } from 'react'

import type { LineChartProps, RevenueGoalChartProps } from '@/types/charts'
import type {
    MetricServiceNewMembersResult,
    MetricServiceTotalMembersResult,
    MetricServiceGetRevenueResult,
    MetricServiceGetMembersResult,
    MetricServiceGetCreatedDatesResult
} from '@/types/validators/records'

export interface DashboardProps {
    children?: ReactNode
}

export interface DashboardDataState {
    newMembers?: MetricServiceNewMembersResult
    newMembersSince?: string
    totalMembers?: MetricServiceTotalMembersResult
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
