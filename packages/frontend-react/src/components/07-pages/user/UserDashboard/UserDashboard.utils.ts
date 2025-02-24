import moment from 'moment'

import type { UserDashboardDataState } from './UserDashboard.types'
import type { ChartData, Point } from 'chart.js'

import type { GridChartProps } from '@/components/04-composites/GridChart/GridChart.types'

import MetricService2 from '@/lib/providers/MetricService2'
import PrivilegeService2 from '@/lib/providers/PrivilegeService2'
import {
    generateRowColBubbleDataset,
    convertMonthNumberByNumber,
    convertDayofWeekByNumber,
    generateRowColArray
} from '@/lib/utils'

import type { RevenueGoalChartProps, BubbleChartProps, LineChartProps, LinePoint } from '@/types/custom'
import type {
    Privileges,
    NewMembersResult,
    TotalMembersResult,
    MetricServiceGetRevenueResult,
    MetricServiceGetMembersResult,
    MetricServiceGetCreatedDatesResult
} from '@/types/records'
import type { ArrayElement } from '@/types/utils'

export const initialDataState: UserDashboardDataState = {}

const defaultLineOptions: Omit<ArrayElement<ChartData<'line', LinePoint[]>['datasets']>, 'data'> = {
    fill: true,
    tension: 0.1
}

const domLabels = [
    [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
]

const dowLabels = [
    [
        '12am',
        '1am',
        '2am',
        '3am',
        '4am',
        '5am',
        '6am',
        '7am',
        '8am',
        '9am',
        '10am',
        '11am',
        '12pm',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm',
        '6pm',
        '7pm',
        '8pm',
        '9pm',
        '10pm',
        '11pm'
    ],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
]

export const getAllPermissions = async (): Promise<Privileges> => {
    const allPermissions = await PrivilegeService2.getInstance().GetAllPrivileges()

    if (allPermissions == null || typeof allPermissions !== 'object') throw new Error('Error fetching all permissions')

    return allPermissions
}

export const getNewMembers = async (): Promise<NewMembersResult> => {
    const newMembers = await MetricService2.getInstance().GetNewMembers(
        moment().utc().subtract(30, 'days').startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString()
    )

    if (newMembers == null || typeof newMembers !== 'object')
        throw new Error('Invalid new members data for past 30 days')

    return newMembers
}

export const getNewMembersArgs = (): string[] => {
    return [
        moment().utc().subtract(30, 'days').startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString()
    ]
}

export const getTotalMembers = async (): Promise<TotalMembersResult> => {
    const totalMembers = await MetricService2.getInstance().GetTotalMembers()

    if (totalMembers == null || typeof totalMembers !== 'object')
        throw new Error('Invalid new members data for past 30 days')

    return totalMembers
}

export const getReportMonth = (): string => moment().format('MMMM YYYY')

export const getRevenueLastMonth = async (): Promise<MetricServiceGetRevenueResult> => {
    const revenueLastMonth = await MetricService2.getInstance().GetRevenue(
        moment().utc().subtract(1, 'months').startOf('month').toISOString(),
        moment().utc().subtract(1, 'months').endOf('month').toISOString(),
        'all'
    )

    if (revenueLastMonth == null || typeof revenueLastMonth !== 'object')
        throw new Error(`Invalid revenue data for last month's period`)

    return revenueLastMonth
}

export const getRevenueThisMonth = async (): Promise<MetricServiceGetRevenueResult> => {
    const revenueThisMonth = await MetricService2.getInstance().GetRevenue(
        moment().utc().startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString(),
        'all'
    )

    if (revenueThisMonth == null || typeof revenueThisMonth !== 'object')
        throw new Error(`Invalid revenue data for this month's period`)

    return revenueThisMonth
}

export const getHistoricalMonthlyRevenue = async (): Promise<MetricServiceGetRevenueResult> => {
    const historicalMonthlyRevenue = await MetricService2.getInstance().GetRevenue(
        moment().utc().subtract(18, 'months').startOf('month').toISOString(),
        moment().utc().subtract(1, 'months').endOf('month').toISOString(),
        'month'
    )

    if (historicalMonthlyRevenue == null || typeof historicalMonthlyRevenue !== 'object')
        throw new Error(`Invalid revenue data for historical monthly revenue`)

    return historicalMonthlyRevenue
}

export const getHistoricalMonthlyMemberCounts = async (): Promise<MetricServiceGetMembersResult> => {
    const historicalMonthlyMembershipCounts = await MetricService2.getInstance().GetMembers(
        moment().utc().subtract(18, 'months').startOf('month').toISOString(),
        moment().utc().subtract(1, 'months').endOf('month').toISOString(),
        'month'
    )

    if (historicalMonthlyMembershipCounts == null || typeof historicalMonthlyMembershipCounts !== 'object')
        throw new Error(`Invalid revenue data for historical monthly membership counts`)

    return historicalMonthlyMembershipCounts
}

export const getCreatedDates = async (): Promise<MetricServiceGetCreatedDatesResult> => {
    const createdDates = await MetricService2.getInstance().GetCreatedDates(
        moment().utc().subtract(18, 'months').startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString()
    )

    if (createdDates == null || typeof createdDates !== 'object') throw new Error(`Invalid data for created dates`)

    return createdDates
}

export const getCreatedDatesLast30days = async (): Promise<MetricServiceGetCreatedDatesResult> => {
    const createdDatesLast30days = await MetricService2.getInstance().GetCreatedDates(
        moment().utc().subtract(3, 'months').startOf('month').toISOString(),
        moment().utc().endOf('month').toISOString()
    )

    if (createdDatesLast30days == null || typeof createdDatesLast30days !== 'object')
        throw new Error(`Invalid data for created dates for the last 30 days`)

    return createdDatesLast30days
}

export const generateRevenueGoalDoughnutChartOptions = (
    revenueThisMonth: MetricServiceGetRevenueResult,
    revenueLastMonth: MetricServiceGetRevenueResult
): RevenueGoalChartProps => {
    return {
        type: 'doughnut',
        data: {
            // @ts-expect-error missing
            labels: [`Current: $${revenueThisMonth.grouping.all}`, `Expected: $${revenueLastMonth.grouping.all}`],
            datasets: [
                {
                    data: [
                        // @ts-expect-error missing
                        Number(revenueThisMonth.grouping.all),
                        // @ts-expect-error missing
                        Number(revenueLastMonth.grouping.all) - Number(revenueThisMonth.grouping.all)
                    ],
                    backgroundColor: ['#35a435', 'rgba(124, 181, 236, 0.74902)'],
                    borderColor: ['#35a435', 'rgba(124, 181, 236, 0.74902)']
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Expected Monthly Revenue - ${getReportMonth()}`
                },
                subtitle: {
                    display: true,
                    text: 'Note: by PayPal transactions, these happen throughout the month'
                }
            }
        }
    }
}

export const generateDoWHourBubbleChartOptions = (
    title: string,
    source: Record<string, Record<string, number>>,
    labels: string[][]
): BubbleChartProps => {
    const data: BubbleChartProps['data'] = {
        datasets: [{ data: generateRowColBubbleDataset(7, 24), label: title }]
    }

    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 24; col++) {
            const cell = source[row]?.[col]

            if (cell != null && !Number.isNaN(cell)) {
                const cellPoint = data.datasets[0].data.find((p) => p.x === col && p.y === row)

                if (cellPoint?.r != null) cellPoint.r = cell
                else data.datasets[0].data.push({ x: col, y: row, r: cell })
            }
        }
    }

    const maxR = Math.max(...data.datasets[0].data.map((e) => (e?.r != null ? e.r : 0)))
    // eslint-disable-next-line no-undef
    const amplification = maxR / Math.round(window?.innerWidth * 0.035)

    data.datasets[0].data.forEach((p) => {
        if (p?.r != null) {
            p.r = p.r / maxR / amplification
        }
    })

    return {
        type: 'bubble',

        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                x: {
                    // type: 'category',
                    labels: dowLabels[0],
                    ticks: {
                        callback: function (value) {
                            return Math.floor(Number(value)) === Number(value) ? labels[0][Number(value)] : ''
                        }
                    }
                },
                y: {
                    labels: dowLabels[1]
                    // ticks: {
                    //     callback: function (value) {
                    //         return Math.floor(Number(value)) === Number(value) ? convertDayofWeekByNumber(value) : ''
                    //     }
                    // }
                }
            }
        },

        data,

        labels: labels[0]
    }
}

export const generateDoWMonthBubbleChartOptions = (
    title: string,
    source: Record<string, Record<string, number | 'total'>>,
    labels: string[][]
): BubbleChartProps => {
    const data: BubbleChartProps['data'] = {
        datasets: [{ data: generateRowColBubbleDataset(7, 12), label: title }]
    }

    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 12; col++) {
            const cell = source[row]?.[col + 1]
            if (cell != null && cell !== 'total' && !Number.isNaN(cell)) {
                const cellPoint = data.datasets[0].data.find((p) => p.x === col && p.y === row)

                if (cellPoint?.r != null) cellPoint.r = cell
                else data.datasets[0].data.push({ x: col, y: row, r: cell })
            }
        }
    }

    const maxR = Math.max(...data.datasets[0].data.map((e) => (e?.r != null ? e.r : 0)))
    // eslint-disable-next-line no-undef
    const amplification = maxR / Math.round(window?.innerWidth * 0.035)

    data.datasets[0].data.forEach((p) => {
        if (p?.r != null) {
            p.r = p.r / maxR / amplification
        }
    })

    return {
        type: 'bubble',

        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                x: {
                    ticks: {
                        callback: function (value) {
                            return Math.floor(Number(value)) === Number(value) ? convertMonthNumberByNumber(value) : ''
                        }
                    }
                },
                y: {
                    ticks: {
                        callback: function (value) {
                            return Math.floor(Number(value)) === Number(value) ? convertDayofWeekByNumber(value) : ''
                        }
                    }
                }
            }
        },

        data,

        labels: labels[0]
    }
}

export const generateDoWHourChartOptions = (
    title: string,
    source: Record<string, Record<string, number>>,
    labels: string[][]
): GridChartProps => {
    const data: number[][] = generateRowColArray(7, 24)

    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 24; col++) {
            const cell = source[row]?.[col]
            if (cell != null && !Number.isNaN(cell)) data[row][col] = cell ?? 0
        }
    }

    return {
        title,
        data,
        labels,
        showNullValues: true,
        showValues: true,
        gradientFill: true
    }
}

export const generateDoWMonthChartOptions = (
    title: string,
    source: Record<string, Record<string, number | 'total'>>,
    labels: string[][]
): GridChartProps => {
    const data: number[][] = generateRowColArray(7, 12)

    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 12; col++) {
            const cell = source[row + 1]?.[col]
            if (cell != null && cell !== 'total' && !Number.isNaN(cell)) data[row][col] = cell
        }
    }

    return {
        title,
        data,
        labels,
        showNullValues: true,
        showValues: true,
        gradientFill: true
    }
}

export const generateCreatedByDoWHourBubbleChartOptions = (
    createdDates: MetricServiceGetCreatedDatesResult
): BubbleChartProps => {
    return generateDoWHourBubbleChartOptions(
        'Popular sign up times (last 18 months)',
        createdDates.byDowHour,
        dowLabels
    )
}

export const generateCreatedByDoWHourChartOptions = (
    createdDates: MetricServiceGetCreatedDatesResult
): GridChartProps => {
    return generateDoWHourChartOptions('Popular sign up times (last 18 months)', createdDates.byDowHour, dowLabels)
}

export const generateCreatedByDoWHour30daysBubbleChartOptions = (
    createdDatesLast30days: MetricServiceGetCreatedDatesResult
): BubbleChartProps => {
    return generateDoWHourBubbleChartOptions(
        'Popular sign up times (last 3 months)',
        createdDatesLast30days.byDowHour,
        dowLabels
    )
}

export const generateCreatedByDoWHour30daysChartOptions = (
    createdDatesLast30days: MetricServiceGetCreatedDatesResult
): GridChartProps => {
    return generateDoWHourChartOptions(
        'Popular sign up times (last 3 months)',
        createdDatesLast30days.byDowHour,
        dowLabels
    )
}

export const generateCreatedByMonthDoWBubbleChartOptions = (
    createdDates: MetricServiceGetCreatedDatesResult
): BubbleChartProps => {
    return generateDoWMonthBubbleChartOptions(
        'Popular sign up months (last 18 months)',
        createdDates.byMonthDow,
        domLabels
    )
}

export const generateCreatedByMonthDoWChartOptions = (
    createdDates: MetricServiceGetCreatedDatesResult
): GridChartProps => {
    return generateDoWMonthChartOptions('Popular sign up months (last 18 months)', createdDates.byMonthDow, domLabels)
}

export const generateLineChartOptions = (
    title: string,
    data: ChartData<'line', LinePoint[]>,
    labels: string[]
): LineChartProps => ({
    type: 'line',

    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: title
            }
        }
    },

    data,

    labels
})

export const generateRevenueLineChartOptions = (revenue: MetricServiceGetRevenueResult): LineChartProps => {
    const labels: string[] = [
        ...Object.keys(revenue.grouping),
        ...(revenue.by_membership.vhs_membership_keyholder != null
            ? Object.keys(revenue.by_membership.vhs_membership_keyholder)
            : []),
        ...(revenue.by_membership.vhs_membership_member != null
            ? Object.keys(revenue.by_membership.vhs_membership_member)
            : []),
        ...(revenue.by_membership.Donation != null ? Object.keys(revenue.by_membership.Donation) : []),
        ...(revenue.by_membership.vhs_card_2015 != null ? Object.keys(revenue.by_membership.vhs_card_2015) : [])
    ]
        .reduce<string[]>((c, e) => {
            if (!c.includes(e)) c.push(e)
            return c
        }, [])
        .sort((a, b) => a.localeCompare(b))

    const data: ChartData<'line', Array<number | Point | null>> = {
        labels,
        datasets: []
    }

    Object.entries(revenue.by_membership).forEach(([revenueType, revenueData]) => {
        data.datasets.push({
            ...defaultLineOptions,
            label: revenueType,
            data: labels.map((e) => revenueData[e])
        })
    })

    return generateLineChartOptions('Annual Revenue', data, labels)
}

export const generateMembershipLineChartOptions = (members: MetricServiceGetMembersResult): LineChartProps => {
    const labels: string[] = [
        ...Object.keys(members.created),
        ...Object.keys(members.expired),
        ...Object.keys(members.total)
    ]
        .reduce<string[]>((c, e) => {
            if (!c.includes(e)) c.push(e)
            return c
        }, [])
        .sort((a, b) => a.localeCompare(b))

    const data: ChartData<'line', Array<number | Point | null>> = {
        labels,
        datasets: []
    }

    data.datasets.push({
        ...defaultLineOptions,
        label: 'Created',
        data: labels.map((e) => members.created[e])
    })

    data.datasets.push({
        ...defaultLineOptions,
        label: 'Expired',
        data: labels.map((e) => members.expired[e])
    })

    data.datasets.push({
        ...defaultLineOptions,
        label: 'Total',
        data: labels.map((e) => members.total[e])
    })

    return generateLineChartOptions('Change in Membership', data, labels)
}
