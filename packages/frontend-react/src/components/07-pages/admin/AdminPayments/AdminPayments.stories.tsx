import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminPayments from './AdminPayments'

type StoryType = StoryObj<typeof AdminPayments>

const meta: Meta<typeof AdminPayments> = {
    component: AdminPayments,
    title: '07-Pages/Admin/AdminPayments',
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
        children: 'AdminPayments'
    }
}
