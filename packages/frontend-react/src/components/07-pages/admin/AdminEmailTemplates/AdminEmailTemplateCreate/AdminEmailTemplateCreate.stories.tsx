import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminEmailTemplateCreate from './AdminEmailTemplateCreate'

type StoryType = StoryObj<typeof AdminEmailTemplateCreate>

const meta: Meta<typeof AdminEmailTemplateCreate> = {
    component: AdminEmailTemplateCreate,
    title: '07-Pages/Admin/AdminEmailTemplates/AdminEmailTemplateCreate',
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
        children: 'AdminEmailTemplateCreate'
    }
}
