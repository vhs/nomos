import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserProfile from './UserProfile'

type StoryType = StoryObj<typeof UserProfile>

const meta: Meta<typeof UserProfile> = {
    component: UserProfile,
    title: '07-Pages/User/UserProfile',
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
        children: 'UserProfile'
    }
}
