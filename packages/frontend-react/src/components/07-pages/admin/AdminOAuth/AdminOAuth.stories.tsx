import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminOAuth from './AdminOAuth'

type StoryType = StoryObj<typeof AdminOAuth>

const meta: Meta<typeof AdminOAuth> = {
    component: AdminOAuth,
    title: '07-Pages/Admin/AdminOAuth',
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
        children: 'AdminOAuth'
    }
}
