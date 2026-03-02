import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Users from './Users'

type StoryType = StoryObj<typeof Users>

const meta: Meta<typeof Users> = {
    component: Users,
    title: '07-Pages/Admin/Users',
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
        children: 'Users'
    }
}
