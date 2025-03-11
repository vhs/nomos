import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserGrantingItem from './UserGrantingItem'

type StoryType = StoryObj<typeof UserGrantingItem>

const meta: Meta<typeof UserGrantingItem> = {
    component: UserGrantingItem,
    title: '07-Pages/User/UserGranting/UserGrantingItem',
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
        children: 'UserGrantingItem'
    }
}
