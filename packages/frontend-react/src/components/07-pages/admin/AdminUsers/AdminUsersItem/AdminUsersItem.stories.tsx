import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminUsersItem from './AdminUsersItem'

type StoryType = StoryObj<typeof AdminUsersItem>

const meta: Meta<typeof AdminUsersItem> = {
    component: AdminUsersItem,
    title: '07-Pages/Admin/AdminUsers/AdminUsersItem',
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
        children: 'AdminUsersItem'
    }
}
