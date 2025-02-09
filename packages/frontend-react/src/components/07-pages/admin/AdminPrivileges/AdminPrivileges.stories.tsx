import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminPrivileges from './AdminPrivileges'

type StoryType = StoryObj<typeof AdminPrivileges>

const meta: Meta<typeof AdminPrivileges> = {
    component: AdminPrivileges,
    title: '07-Pages/Admin/AdminPrivileges',
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
        children: 'AdminPrivileges'
    }
}
