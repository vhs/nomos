import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AccountStatusBadge from './AccountStatusBadge'

type StoryType = StoryObj<typeof AccountStatusBadge>

const meta: Meta<typeof AccountStatusBadge> = {
    component: AccountStatusBadge,
    title: '01-Atoms/AccountStatusBadge',
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
        status: 'AccountStatusBadge'
    }
}
