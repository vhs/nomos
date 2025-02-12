import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminMembershipsEdit from './AdminMembershipsEdit'

type StoryType = StoryObj<typeof AdminMembershipsEdit>

const meta: Meta<typeof AdminMembershipsEdit> = {
    component: AdminMembershipsEdit,
    title: '07-Pages/Admin/AdminMemberships/AdminMembershipsEdit',
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
        children: 'AdminMembershipsEdit'
    }
}
