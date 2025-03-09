import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminDashboard from './AdminDashboard'

type StoryType = StoryObj<typeof AdminDashboard>

const meta: Meta<typeof AdminDashboard> = {
    component: AdminDashboard,
    title: '07-Pages/Admin/AdminDashboard',
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
        children: 'AdminDashboard'
    }
}
