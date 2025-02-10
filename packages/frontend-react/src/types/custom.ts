import type { Dispatch, SetStateAction } from 'react'

import type { Point } from 'chart.js'
import type { ChartProps } from 'react-chartjs-2'

export type BackendResult<T> = Promise<T | string | null>
export type BubbleChartProps = ChartProps<'bubble'> & { labels: string[] }
export type DoWChartProps = ChartProps<'bubble'>
export type EventType = string
export type EventTypes = EventType[]
export type LineChartProps = ChartProps<'line'> & { labels: string[] }
export type NOMOSResponse<T extends object = object> = Response & T
export type NOMOSSWRResponse<T extends object = object> = T | string | null | undefined
export type OrEmptyString<T> = T | ''
export type PrivilegeCodes = string[]
export type ReactAction<T> = Dispatch<SetStateAction<T>>
export type RevenueGoalChartProps = ChartProps<'doughnut'>

export type WithoutId<T> = Omit<T, 'id'>

export interface ServiceResponseSuccess {
    success: true
    msg: 'success'
}

export interface ServiceResponseError {
    success: false
    msg: string
}

export type ServiceResponse = ServiceResponseSuccess | ServiceResponseError

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TablePageItemComponent<T = any> {
    data: T
}

export type LinePoint = number | Point | null
