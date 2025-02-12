import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import TemplateName from './TemplateName'

type StoryType = StoryObj<typeof TemplateName>

const meta: Meta<typeof TemplateName> = {
    component: TemplateName,
    title: '99-Templates/User-page',
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
        children: 'TemplateName'
    }
}
