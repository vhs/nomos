import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UsersEdit from './UsersEdit'

type StoryType = StoryObj<typeof UsersEdit>

const meta: Meta<typeof UsersEdit> = {
    component: UsersEdit,
    title: '07-Pages/Admin/Users/UsersEdit',
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
        children: 'UsersEdit'
    }
}
