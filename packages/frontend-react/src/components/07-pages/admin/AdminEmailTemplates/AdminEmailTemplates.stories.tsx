import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminEmailTemplates from './AdminEmailTemplates'

type StoryType = StoryObj<typeof AdminEmailTemplates>

const meta: Meta<typeof AdminEmailTemplates> = {
    component: AdminEmailTemplates,
    title: '07-Pages/Admin/AdminEmailTemplates',
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
        children: 'AdminEmailTemplates'
    }
}
