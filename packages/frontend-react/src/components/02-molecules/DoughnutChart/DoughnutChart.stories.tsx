import type { JSX } from 'react'

import type { ChartProps } from 'react-chartjs-2'

import DoughnutChart from './DoughnutChart'

export default {
    title: '02-Molecules/DoughnutChart'
}

const storyData: ChartProps<'doughnut'>['data'] = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4
        }
    ]
}

export const Default = (): JSX.Element => <DoughnutChart type={'doughnut'} data={storyData} />
