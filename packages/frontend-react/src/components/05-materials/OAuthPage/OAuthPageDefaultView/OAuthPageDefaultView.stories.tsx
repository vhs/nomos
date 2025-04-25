import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OAuthPageDefaultView from './OAuthPageDefaultView'

type StoryType = StoryObj<typeof OAuthPageDefaultView>

const meta: Meta<typeof OAuthPageDefaultView> = {
    component: OAuthPageDefaultView,
    title: '05-Materials/OAuthPage/OAuthPageDefaultView',
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
        children: 'OAuthPageDefaultView'
    }
}
