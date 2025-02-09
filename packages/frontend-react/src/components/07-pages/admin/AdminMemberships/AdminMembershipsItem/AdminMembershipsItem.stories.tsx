import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminMembershipsItem from './AdminMembershipsItem'

type StoryType = StoryObj<typeof AdminMembershipsItem>

const meta: Meta<typeof AdminMembershipsItem> = {
    component: AdminMembershipsItem,
    title: '99-Templates/default',
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
        children: 'AdminMembershipsItem'
    }
}
