import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeysNewModal from './ApiKeysNewModal'

type StoryType = StoryObj<typeof ApiKeysNewModal>

const meta: Meta<typeof ApiKeysNewModal> = {
    component: ApiKeysNewModal,
    title: '07-integrated-Pages/ApiKeysPage/ApiKeysNewModal',
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
