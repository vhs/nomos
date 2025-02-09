import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminUsers from './AdminUsers'

type StoryType = StoryObj<typeof AdminUsers>

const meta: Meta<typeof AdminUsers> = {
    component: AdminUsers,
    title: '07-Pages/Admin/AdminUsers',
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
        children: 'AdminUsers'
    }
}
