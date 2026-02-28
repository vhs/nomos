import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Payments from './Payments'

type StoryType = StoryObj<typeof Payments>

const meta: Meta<typeof Payments> = {
    component: Payments,
    title: '07-Pages/Admin/Payments',
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
        children: 'Payments'
    }
}
