import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import DatabaseBackup from './DatabaseBackup'

type StoryType = StoryObj<typeof DatabaseBackup>

const meta: Meta<typeof DatabaseBackup> = {
    component: DatabaseBackup,
    title: '07-Pages/Admin/DatabaseBackup',
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
        children: 'DatabaseBackup'
    }
}
