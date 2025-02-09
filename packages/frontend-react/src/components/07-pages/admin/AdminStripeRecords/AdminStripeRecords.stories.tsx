import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminStripeRecords from './AdminStripeRecords'

type StoryType = StoryObj<typeof AdminStripeRecords>

const meta: Meta<typeof AdminStripeRecords> = {
    component: AdminStripeRecords,
    title: '07-Pages/Admin/AdminStripeRecords',
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
        children: 'AdminStripeRecords'
    }
}
