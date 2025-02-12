import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminApiKeys from './AdminApiKeys'

type StoryType = StoryObj<typeof AdminApiKeys>

const meta: Meta<typeof AdminApiKeys> = {
    component: AdminApiKeys,
    title: '07-Pages/Admin/AdminApiKeys',
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
        children: 'AdminApiKeys'
    }
}
