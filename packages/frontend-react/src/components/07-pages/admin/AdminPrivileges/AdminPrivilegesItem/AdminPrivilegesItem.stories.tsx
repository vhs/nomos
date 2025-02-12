import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminPrivilegesItem from './AdminPrivilegesItem'

type StoryType = StoryObj<typeof AdminPrivilegesItem>

const meta: Meta<typeof AdminPrivilegesItem> = {
    component: AdminPrivilegesItem,
    title: '07-Pages/Admin/AdminPrivileges/AdminPrivilegesItem',
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
        children: 'AdminPrivilegesItem'
    }
}
