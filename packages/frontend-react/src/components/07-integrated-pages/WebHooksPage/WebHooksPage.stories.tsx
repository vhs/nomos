import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import WebHooksPage from './WebHooksPage'

type StoryType = StoryObj<typeof WebHooksPage>

const meta: Meta<typeof WebHooksPage> = {
    component: WebHooksPage,
    title: '07-integrated-Pages/WebHooksPage',
    decorators: [
        (Story) => (
            <AuthenticationProvider>
                <Story />
            </AuthenticationProvider>
        )
    ]
}

export default meta

export const Admin: StoryType = {
    args: {
        user: false
    }
}

export const User: StoryType = {
    args: {
        user: true
    }
}
