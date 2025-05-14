import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPage from './OAuthPage'

type StoryType = StoryObj<typeof OAuthPage>

const meta: Meta<typeof OAuthPage> = {
    component: OAuthPage,
    title: '07-integrated-Pages/OAuthPage',
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
        children: 'OAuthPage'
    }
}
