import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserTransactions from './UserTransactions'

type StoryType = StoryObj<typeof UserTransactions>

const meta: Meta<typeof UserTransactions> = {
    component: UserTransactions,
    title: '07-Pages/User/UserTransactions',
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
        children: 'UserTransactions'
    }
}
