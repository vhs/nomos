import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UsersNew from './UsersNew'

type StoryType = StoryObj<typeof UsersNew>

const meta: Meta<typeof UsersNew> = {
    component: UsersNew,
    title: '07-Pages/Admin/Users/UsersNew',
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
        children: 'UsersNew'
    }
}
