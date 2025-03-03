import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeyNewModal from './ApiKeyNewModal'

type StoryType = StoryObj<typeof ApiKeyNewModal>

const meta: Meta<typeof ApiKeyNewModal> = {
    component: ApiKeyNewModal,
    title: '05-Materials/ApiKeysPage/ApiKeysNewModal',
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
