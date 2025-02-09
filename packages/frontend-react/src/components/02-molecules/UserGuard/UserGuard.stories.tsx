import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import UserGuard from './UserGuard'

type StoryType = StoryObj<typeof UserGuard>

const meta: Meta<typeof UserGuard> = {
    component: UserGuard,
    title: '02-Molecules/UserGuard',
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
        children: 'UserGuard'
    }
}
