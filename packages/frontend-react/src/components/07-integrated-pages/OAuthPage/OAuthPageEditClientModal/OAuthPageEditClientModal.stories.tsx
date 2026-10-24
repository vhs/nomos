import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPageEditClientModal from './OAuthPageEditClientModal'

type StoryType = StoryObj<typeof OAuthPageEditClientModal>

const meta: Meta<typeof OAuthPageEditClientModal> = {
    component: OAuthPageEditClientModal,
    title: '07-integrated-Pages/OAuthPage/OAuthPageEditClientModal',
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
        children: 'OAuthPageEditClientModal'
    }
}
