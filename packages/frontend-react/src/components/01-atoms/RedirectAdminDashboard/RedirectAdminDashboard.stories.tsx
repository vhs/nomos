import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import RedirectAdminDashboard from './RedirectAdminDashboard'

type StoryType = StoryObj<typeof RedirectAdminDashboard>

const meta: Meta<typeof RedirectAdminDashboard> = {
    component: RedirectAdminDashboard,
    title: '01-Atoms/RedirectAdminDashboard',
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
        children: 'RedirectAdminDashboard'
    }
}
