import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPageClientView from './OAuthPageClientView'

type StoryType = StoryObj<typeof OAuthPageClientView>

const meta: Meta<typeof OAuthPageClientView> = {
    component: OAuthPageClientView,
    title: '07-integrated-Pages/OAuthPage/OAuthPageClientView',
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
        children: 'OAuthPageClientView'
    }
}
