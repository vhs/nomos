import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import { mockPrincipalUserData } from '@/lib/mocking/data'
// import { mockHandlers } from '@/lib/mocking/handlers'

import type { Key } from '@/types/validators/records'

import ApiKeysListItem from './ApiKeysListItem'

const mockApiKeysListItem: Key = {
    id: 1,
    created: new Date(),
    key: crypto.randomUUID(),
    type: 'api',
    userid: 1,
    notes: 'mockApiKeysListItem',
    privileges: mockPrincipalUserData.privileges
}

type StoryType = StoryObj<typeof ApiKeysListItem>

const meta: Meta<typeof ApiKeysListItem> = {
    component: ApiKeysListItem,
    title: '05-Materials/ApiKeysPage/ApiKeysListPage/ApiKeysListItem',
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
        apiKey: mockApiKeysListItem
    }
}
