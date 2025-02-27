import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminLayout from './AdminLayout'

type StoryType = StoryObj<typeof AdminLayout>

const meta: Meta<typeof AdminLayout> = {
    component: AdminLayout,
    title: '06-Layouts/AdminLayout',
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
        children: 'AdminLayout'
    }
}
