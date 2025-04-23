import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminEmailTemplateEdit from './AdminEmailTemplateEdit'

type StoryType = StoryObj<typeof AdminEmailTemplateEdit>

const meta: Meta<typeof AdminEmailTemplateEdit> = {
    component: AdminEmailTemplateEdit,
    title: '07-Pages/Admin/AdminEmailTemplates/AdminEmailTemplateEdit',
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
        children: 'AdminEmailTemplateEdit'
    }
}
