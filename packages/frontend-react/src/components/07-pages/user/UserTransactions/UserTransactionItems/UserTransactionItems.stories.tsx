import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserTransactionItems from './UserTransactionItems'

type StoryType = StoryObj<typeof UserTransactionItems>

const meta: Meta<typeof UserTransactionItems> = {
    component: UserTransactionItems,
    title: '07-Pages/User/UserTransactions/UserTransactionItems',
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
