import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import EmailTemplateNew from './EmailTemplateNew'

type StoryType = StoryObj<typeof EmailTemplateNew>

const meta: Meta<typeof EmailTemplateNew> = {
    component: EmailTemplateNew,
    title: '07-Pages/Admin/EmailTemplates/EmailTemplateNew',
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
        children: 'EmailTemplateNew'
    }
}
