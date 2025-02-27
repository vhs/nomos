import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminPaymentGateways from './AdminPaymentGateways'

type StoryType = StoryObj<typeof AdminPaymentGateways>

const meta: Meta<typeof AdminPaymentGateways> = {
    component: AdminPaymentGateways,
    title: '07-Pages/Admin/AdminPaymentGateways',
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
        children: 'AdminPaymentGateways'
    }
}
