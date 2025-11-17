import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import GrantingItem from './GrantingItem'

type StoryType = StoryObj<typeof GrantingItem>

const meta: Meta<typeof GrantingItem> = {
    component: GrantingItem,
    title: '07-Pages/User/Granting/GrantingItem',
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
        children: 'GrantingItem'
    }
}
