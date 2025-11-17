import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UsersItem from './UsersItem'

type StoryType = StoryObj<typeof UsersItem>

const meta: Meta<typeof UsersItem> = {
    component: UsersItem,
    title: '07-Pages/Admin/Users/UsersItem',
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
    args: {}
}
