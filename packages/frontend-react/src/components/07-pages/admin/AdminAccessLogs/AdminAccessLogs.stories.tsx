import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminAccessLogs from './AdminAccessLogs'

type StoryType = StoryObj<typeof AdminAccessLogs>

const meta: Meta<typeof AdminAccessLogs> = {
    component: AdminAccessLogs,
    title: '07-Pages/Admin/AdminAccessLogs',
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
        children: 'AdminAccessLogs'
    }
}
