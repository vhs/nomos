import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPageContainer from './OAuthPageContainer'

type StoryType = StoryObj<typeof OAuthPageContainer>

const meta: Meta<typeof OAuthPageContainer> = {
    component: OAuthPageContainer,
    title: '07-integrated-Pages/OAuthPage/OAuthPageContainer',
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
        children: 'OAuthPageContainer'
    }
}
