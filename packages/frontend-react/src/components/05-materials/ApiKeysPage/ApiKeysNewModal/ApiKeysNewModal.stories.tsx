import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeysNewModal from './ApiKeysNewModal'

type StoryType = StoryObj<typeof ApiKeysNewModal>

const meta: Meta<typeof ApiKeysNewModal> = {
    component: ApiKeysNewModal,
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
