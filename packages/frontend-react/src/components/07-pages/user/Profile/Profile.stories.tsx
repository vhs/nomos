import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Profile from './Profile'

type StoryType = StoryObj<typeof Profile>

const meta: Meta<typeof Profile> = {
    component: Profile,
    title: '07-Pages/User/Profile',
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
        children: 'Profile'
    }
}
