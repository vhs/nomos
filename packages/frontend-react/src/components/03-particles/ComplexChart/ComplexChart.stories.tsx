import type { JSX } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ComplexChart from './ComplexChart'

type StoryType = StoryObj<typeof ComplexChart>

const meta: Meta<typeof ComplexChart> = {
    component: ComplexChart,
    title: '03-Particles/ComplexChart',
    decorators: [
        (Story) => (
            <AuthenticationProvider>
                <Story />
            </AuthenticationProvider>
        )
    ]
}

export default meta

export const Default: StoryType = {
    args: {
        component: (): JSX.Element => <>Test</>,
        displayName: 'Test',
        height: 350,
        width: 350
    }
}
