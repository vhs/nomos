import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import PaymentGateways from './PaymentGateways'

type StoryType = StoryObj<typeof PaymentGateways>

const meta: Meta<typeof PaymentGateways> = {
    component: PaymentGateways,
    title: '07-Pages/Admin/PaymentGateways',
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
        children: 'PaymentGateways'
    }
}
