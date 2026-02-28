import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import TransactionItems from './TransactionItems'

type StoryType = StoryObj<typeof TransactionItems>

const meta: Meta<typeof TransactionItems> = {
    component: TransactionItems,
    title: '07-Pages/User/Transactions/TransactionItems',
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
