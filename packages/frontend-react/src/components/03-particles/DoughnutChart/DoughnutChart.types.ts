import type { ChartProps } from 'react-chartjs-2'

export interface DoughnutChartProps extends ChartProps<'doughnut'> {
    height?: number | string
    width?: number | string
}
