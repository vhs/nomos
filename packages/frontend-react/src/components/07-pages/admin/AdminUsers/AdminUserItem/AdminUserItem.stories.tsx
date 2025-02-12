import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminUserItem from './AdminUserItem'

type StoryType = StoryObj<typeof AdminUserItem>

const meta: Meta<typeof AdminUserItem> = {
    component: AdminUserItem,
    title: '07-Pages/Admin/AdminUsers/AdminUserItem',
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
        children: 'AdminUserItem'
    }
}
