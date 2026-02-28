import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserTemplateNameItem from './UserTemplateNameItem'

type StoryType = StoryObj<typeof UserTemplateNameItem>

const meta: Meta<typeof UserTemplateNameItem> = {
    component: UserTemplateNameItem,
    title: '99-Templates/User-page/UserTemplateNameItem',
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
        children: 'UserTemplateNameItem'
    }
}
