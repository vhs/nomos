import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import EmailTemplateItem from './EmailTemplateItem'

type StoryType = StoryObj<typeof EmailTemplateItem>

const meta: Meta<typeof EmailTemplateItem> = {
    component: EmailTemplateItem,
    title: '07-Pages/Admin/EmailTemplates/EmailTemplateItem',
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
    args: {}
}
