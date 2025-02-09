import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import RedirectUserDashboard from './RedirectUserDashboard'

type StoryType = StoryObj<typeof RedirectUserDashboard>

const meta: Meta<typeof RedirectUserDashboard> = {
    component: RedirectUserDashboard,
    title: '01-Atoms/RedirectUserDashboard',
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
        children: 'RedirectUserDashboard'
    }
}
