import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import StripeRecords from './StripeRecords'

type StoryType = StoryObj<typeof StripeRecords>

const meta: Meta<typeof StripeRecords> = {
    component: StripeRecords,
    title: '07-Pages/Admin/StripeRecords',
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
        children: 'StripeRecords'
    }
}
