import type { Point } from 'chart.js'
import type { ChartProps } from 'react-chartjs-2'

export type BubbleChartProps = ChartProps<'bubble'> & { labels: string[] }
export type DoWChartProps = ChartProps<'bubble'>
export type LineChartProps = ChartProps<'line'> & { labels: string[] }
export type LinePoint = number | Point | null
export type RevenueGoalChartProps = ChartProps<'doughnut'>
