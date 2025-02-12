import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ApiKeyHelp from './ApiKeyHelp'

type StoryType = StoryObj<typeof ApiKeyHelp>

const meta: Meta<typeof ApiKeyHelp> = {
    component: ApiKeyHelp,
    title: '05-Materials/ApiKeyHelp',
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
        children: 'ApiKeyHelp'
    }
}
