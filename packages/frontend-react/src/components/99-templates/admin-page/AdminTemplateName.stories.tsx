import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminTemplateName from './AdminTemplateName'

type StoryType = StoryObj<typeof AdminTemplateName>

const meta: Meta<typeof AdminTemplateName> = {
    component: AdminTemplateName,
    title: '99-Templates/Admin-page',
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
        children: 'AdminTemplateName'
    }
}
