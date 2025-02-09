import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserAccessHistory from './UserAccessHistory'

type StoryType = StoryObj<typeof UserAccessHistory>

const meta: Meta<typeof UserAccessHistory> = {
    component: UserAccessHistory,
    title: '07-Pages/User/UserAccessHistory',
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
        children: 'UserAccessHistory'
    }
}
