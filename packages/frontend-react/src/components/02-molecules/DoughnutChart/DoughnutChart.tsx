import type { FC } from 'react'

import { Doughnut } from 'react-chartjs-2'

import type { DoughnutChartProps } from './DoughnutChart.types'

const DoughnutChart: FC<DoughnutChartProps> = ({ width, height, ...doughnutProps }) => (
    <div data-testid='DoughnutChart' style={{ width, height }}>
        <Doughnut {...doughnutProps} />
    </div>
)

export default DoughnutChart
