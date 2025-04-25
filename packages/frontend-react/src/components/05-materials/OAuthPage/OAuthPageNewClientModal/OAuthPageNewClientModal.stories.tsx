import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPageNewClientModal from './OAuthPageNewClientModal'

type StoryType = StoryObj<typeof OAuthPageNewClientModal>

const meta: Meta<typeof OAuthPageNewClientModal> = {
    component: OAuthPageNewClientModal,
    title: '05-Materials/OAuthPage/OAuthPageNewClientModal',
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
        children: 'OAuthPageNewClientModal'
    }
}
