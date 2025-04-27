import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Dashboard from './Dashboard'

type StoryType = StoryObj<typeof Dashboard>

const meta: Meta<typeof Dashboard> = {
    component: Dashboard,
    title: '07-Pages/Admin/Dashboard',
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
        children: 'Dashboard'
    }
}
