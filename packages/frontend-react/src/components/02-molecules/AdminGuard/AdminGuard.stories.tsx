import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminGuard from './AdminGuard'

type StoryType = StoryObj<typeof AdminGuard>

const meta: Meta<typeof AdminGuard> = {
    component: AdminGuard,
    title: '02-Molecules/AdminGuard',
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
        children: 'AdminGuard'
    }
}
