import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import WebHooks from './WebHooks'

type StoryType = StoryObj<typeof WebHooks>

const meta: Meta<typeof WebHooks> = {
    component: WebHooks,
    title: '07-Pages/Admin/WebHooks',
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
        children: 'WebHooks'
    }
}
