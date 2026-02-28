import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPageClientItem from './OAuthPageClientItem'

type StoryType = StoryObj<typeof OAuthPageClientItem>

const meta: Meta<typeof OAuthPageClientItem> = {
    component: OAuthPageClientItem,
    title: '07-integrated-Pages/OAuthPage/OAuthPageClientView/OAuthPageClientItem',
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
