import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminPrivilegesEdit from './AdminPrivilegesEdit'

type StoryType = StoryObj<typeof AdminPrivilegesEdit>

const meta: Meta<typeof AdminPrivilegesEdit> = {
    component: AdminPrivilegesEdit,
    title: '07-Pages/Admin/AdminPrivileges/AdminPrivilegesEdit',
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
        children: 'AdminPrivilegesEdit'
    }
}
