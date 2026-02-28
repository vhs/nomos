import type { Meta, StoryObj } from '@storybook/react'

import GridChart from './GridChart'

const data = [
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 2, 0, 2, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 2, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 1, 2, 1, 2, 2, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 2, 0, 0, 2, 3, 1, 1, 3, 1, 0, 1, 1, 2, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 1, 2, 0, 2, 0, 3, 6, 3, 2, 1, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 1, 2, 0, 2, 2, 1, 2, 2, 1, 0, 2, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 0, 0, 0, 3, 1, 1, 1, 0, 2, 0]
]

const labels = [
    [
        '12am',
        '',
        '2am',
        '',
        '4am',
        '',
        '6am',
        '',
        '8am',
        '',
        '10am',
        '',
        '12pm',
        '',
        '2pm',
        '',
        '4pm',
        '',
        '6pm',
        '',
        '8pm',
        '',
        '10pm',
        ''
    ],
    ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday']
]

const meta: Meta<typeof GridChart> = {
    title: '03-Particles/GridChart',
    component: GridChart
}

type Story = StoryObj<typeof GridChart>

export const Primary: Story = {
    args: {
        title: '03-Particles/GridChart',
        data,
        labels,
        height: 380,
        width: 480,
        showValues: true,
        showNullValues: false
    }
}

export default meta
