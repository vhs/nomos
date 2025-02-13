import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import NewApiKeyForm from './NewApiKeyForm'

type StoryType = StoryObj<typeof NewApiKeyForm>

const meta: Meta<typeof NewApiKeyForm> = {
    component: NewApiKeyForm,
    title: '05-Materials/ApiKeysPage/NewApiKeyForm',
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
        children: 'NewApiKeyForm'
    }
}
