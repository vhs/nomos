import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ApiKeyUsage from './ApiKeyUsage'

type StoryType = StoryObj<typeof ApiKeyUsage>

const meta: Meta<typeof ApiKeyUsage> = {
    component: ApiKeyUsage,
    title: '05-Materials/ApiKeysPage/ApiKeyUsage',
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
        children: 'ApiKeyUsage'
    }
}
