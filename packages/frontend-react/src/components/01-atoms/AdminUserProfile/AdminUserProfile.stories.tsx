import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminUserProfile from './AdminUserProfile'

type StoryType = StoryObj<typeof AdminUserProfile>

const meta: Meta<typeof AdminUserProfile> = {
    component: AdminUserProfile,
    title: '01-Atoms/AdminUserProfile',
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
        children: 'AdminUserProfile'
    }
}
