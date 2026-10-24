import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import EmailTemplates from './EmailTemplates'

type StoryType = StoryObj<typeof EmailTemplates>

const meta: Meta<typeof EmailTemplates> = {
    component: EmailTemplates,
    title: '07-Pages/Admin/EmailTemplates',
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
        children: 'EmailTemplates'
    }
}
