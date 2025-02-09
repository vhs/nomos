import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminLogs from './AdminLogs'

type StoryType = StoryObj<typeof AdminLogs>

const meta: Meta<typeof AdminLogs> = {
    component: AdminLogs,
    title: '07-Pages/Admin/AdminLogs',
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
        children: 'AdminLogs'
    }
}
