import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminUsersNew from './AdminUsersNew'

type StoryType = StoryObj<typeof AdminUsersNew>

const meta: Meta<typeof AdminUsersNew> = {
    component: AdminUsersNew,
    title: '07-Pages/Admin/AdminUsersNew',
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
        children: 'AdminUsersNew'
    }
}
