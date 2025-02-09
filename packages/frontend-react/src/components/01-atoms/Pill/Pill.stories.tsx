import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Pill from './Pill'

type StoryType = StoryObj<typeof Pill>

const meta: Meta<typeof Pill> = {
    component: Pill,
    title: '01-Atoms/Pill',
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
        children: 'Pill'
    }
}
