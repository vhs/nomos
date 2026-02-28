import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Logs from './Logs'

type StoryType = StoryObj<typeof Logs>

const meta: Meta<typeof Logs> = {
    component: Logs,
    title: '07-Pages/Admin/Logs',
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
        children: 'Logs'
    }
}
