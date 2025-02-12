import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import { mockPrincipalUserData } from '@/lib/mocking/data'
// import { mockHandlers } from '@/lib/mocking/handlers'

import type { Key } from '@/types/records'

import ApiKey from './ApiKey'

const mockApiKey: Key = {
    id: 1,
    created: new Date(),
    key: crypto.randomUUID(),
    type: 'api',
    userid: 1,
    notes: 'mockApiKey',
    privileges: mockPrincipalUserData.privileges
}

type StoryType = StoryObj<typeof ApiKey>

const meta: Meta<typeof ApiKey> = {
    component: ApiKey,
    title: '02-Molecules/ApiKey',
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
        apiKey: mockApiKey,
        availablePrivileges: []
    }
}
