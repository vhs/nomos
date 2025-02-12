import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminPayPalPaymentItem from './AdminPayPalPaymentItem'

type StoryType = StoryObj<typeof AdminPayPalPaymentItem>

const meta: Meta<typeof AdminPayPalPaymentItem> = {
    component: AdminPayPalPaymentItem,
    title: '99-Templates/default',
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
        children: 'AdminPayPalPaymentItem'
    }
}
