import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from './AuthenticationProvider'

type StoryType = StoryObj<typeof AuthenticationProvider>

const meta: Meta<typeof AuthenticationProvider> = {
    component: AuthenticationProvider,
    title: '09-Providers/AuthenticationProvider',
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
        children: 'AuthenticationProvider'
    }
}
