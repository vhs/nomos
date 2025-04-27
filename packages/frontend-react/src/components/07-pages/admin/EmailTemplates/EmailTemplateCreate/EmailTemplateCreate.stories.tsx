import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import EmailTemplateCreate from './EmailTemplateCreate'

type StoryType = StoryObj<typeof EmailTemplateCreate>

const meta: Meta<typeof EmailTemplateCreate> = {
    component: EmailTemplateCreate,
    title: '07-Pages/Admin/EmailTemplates/EmailTemplateCreate',
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
        children: 'EmailTemplateCreate'
    }
}
