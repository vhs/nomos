import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminEvents from './AdminEvents'

type StoryType = StoryObj<typeof AdminEvents>

const meta: Meta<typeof AdminEvents> = {
    component: AdminEvents,
    title: '07-Pages/Admin/AdminEvents',
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
        children: 'AdminEvents'
    }
}
