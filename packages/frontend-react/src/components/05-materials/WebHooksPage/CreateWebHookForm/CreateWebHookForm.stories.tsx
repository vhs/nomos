import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import CreateWebHookForm from './CreateWebHookForm'

type StoryType = StoryObj<typeof CreateWebHookForm>

const meta: Meta<typeof CreateWebHookForm> = {
    component: CreateWebHookForm,
    title: '05-Materials/WebHooksPage/CreateWebHookForm',
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
        children: 'CreateWebHookForm'
    }
}
