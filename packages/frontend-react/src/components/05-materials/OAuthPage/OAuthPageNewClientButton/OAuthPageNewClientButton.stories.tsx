import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPageNewClientButton from './OAuthPageNewClientButton'

type StoryType = StoryObj<typeof OAuthPageNewClientButton>

const meta: Meta<typeof OAuthPageNewClientButton> = {
    component: OAuthPageNewClientButton,
    title: '05-Materials/OAuthPage/OAuthPageNewClientButton',
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
        children: 'OAuthPageNewClientButton'
    }
}
