import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminReports from './AdminReports'

type StoryType = StoryObj<typeof AdminReports>

const meta: Meta<typeof AdminReports> = {
    component: AdminReports,
    title: '07-Pages/Admin/AdminReports',
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
        children: 'AdminReports'
    }
}
