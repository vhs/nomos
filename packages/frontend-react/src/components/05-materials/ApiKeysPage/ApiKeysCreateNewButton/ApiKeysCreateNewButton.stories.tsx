import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeysCreateNewButton from './ApiKeysCreateNewButton'

type StoryType = StoryObj<typeof ApiKeysCreateNewButton>

const meta: Meta<typeof ApiKeysCreateNewButton> = {
    component: ApiKeysCreateNewButton,
    title: '05-Materials/ApiKeysPage/ApiKeysCreateNewButton',
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
        children: 'ApiKeysCreateNewButton'
    }
}
