import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserWebHooks from './UserWebHooks'

type StoryType = StoryObj<typeof UserWebHooks>

const meta: Meta<typeof UserWebHooks> = {
    component: UserWebHooks,
    title: '07-Pages/User/UserWebHooks',
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
        children: 'UserWebHooks'
    }
}
