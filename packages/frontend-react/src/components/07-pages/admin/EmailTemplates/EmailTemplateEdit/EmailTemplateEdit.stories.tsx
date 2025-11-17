import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import EmailTemplateEdit from './EmailTemplateEdit'

type StoryType = StoryObj<typeof EmailTemplateEdit>

const meta: Meta<typeof EmailTemplateEdit> = {
    component: EmailTemplateEdit,
    title: '07-Pages/Admin/EmailTemplates/EmailTemplateEdit',
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
        children: 'EmailTemplateEdit'
    }
}
