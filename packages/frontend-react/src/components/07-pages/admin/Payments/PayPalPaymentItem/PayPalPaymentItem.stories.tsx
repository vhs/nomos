import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import PayPalPaymentItem from './PayPalPaymentItem'

type StoryType = StoryObj<typeof PayPalPaymentItem>

const meta: Meta<typeof PayPalPaymentItem> = {
    component: PayPalPaymentItem,
    title: '07-Pages/Admin/Payments/PayPalPaymentItem',
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
