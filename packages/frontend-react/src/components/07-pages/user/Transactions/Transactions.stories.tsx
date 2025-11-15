import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Transactions from './Transactions'

type StoryType = StoryObj<typeof Transactions>

const meta: Meta<typeof Transactions> = {
    component: Transactions,
    title: '07-Pages/User/Transactions',
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
        children: 'Transactions'
    }
}
