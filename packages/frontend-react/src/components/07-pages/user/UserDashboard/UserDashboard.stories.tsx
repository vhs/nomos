import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserDashboard from './UserDashboard'

type StoryType = StoryObj<typeof UserDashboard>

const meta: Meta<typeof UserDashboard> = {
    component: UserDashboard,
    title: '07-Pages/User/UserDashboard',
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
        children: 'UserDashboard'
    }
}
