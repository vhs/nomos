import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminIPNRecords from './AdminIPNRecords'

type StoryType = StoryObj<typeof AdminIPNRecords>

const meta: Meta<typeof AdminIPNRecords> = {
    component: AdminIPNRecords,
    title: '07-Pages/Admin/AdminIPNRecords',
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
        children: 'AdminIPNRecords'
    }
}
