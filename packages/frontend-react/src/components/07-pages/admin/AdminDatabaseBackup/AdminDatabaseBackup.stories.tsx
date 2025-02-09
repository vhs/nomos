import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminDatabaseBackup from './AdminDatabaseBackup'

type StoryType = StoryObj<typeof AdminDatabaseBackup>

const meta: Meta<typeof AdminDatabaseBackup> = {
    component: AdminDatabaseBackup,
    title: '07-Pages/Admin/AdminDatabaseBackup',
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
        children: 'AdminDatabaseBackup'
    }
}
