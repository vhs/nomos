import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminMemberships from './AdminMemberships'

type StoryType = StoryObj<typeof AdminMemberships>

const meta: Meta<typeof AdminMemberships> = {
    component: AdminMemberships,
    title: '07-Pages/Admin/AdminMemberships',
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
        children: 'AdminMemberships'
    }
}
