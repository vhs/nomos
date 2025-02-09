import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminUsersEdit from './AdminUsersEdit'

type StoryType = StoryObj<typeof AdminUsersEdit>

const meta: Meta<typeof AdminUsersEdit> = {
    component: AdminUsersEdit,
    title: '07-Pages/Admin/AdminUsersEdit',
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
        children: 'AdminUsersEdit'
    }
}
