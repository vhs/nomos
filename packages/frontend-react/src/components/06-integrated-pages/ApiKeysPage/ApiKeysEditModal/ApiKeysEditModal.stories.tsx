import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import { mockPrincipalUserData } from '@/lib/mocking/data'
// import { mockHandlers } from '@/lib/mocking/handlers'

import type { Key } from '@/types/validators/records'

import ApiKeysEditModal from './ApiKeysEditModal'

const mockApiKeysEdit: Key = {
    id: 1,
    created: new Date(),
    key: crypto.randomUUID(),
    type: 'api',
    userid: 1,
    notes: 'mockApiKeysEdit',
    privileges: mockPrincipalUserData.privileges
}

type StoryType = StoryObj<typeof ApiKeysEditModal>

const meta: Meta<typeof ApiKeysEditModal> = {
    component: ApiKeysEditModal,
    title: '06-integrated-Pages/ApiKeysPage/ApiKeysEditModal',
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
        keyId: mockApiKeysEdit.id
    }
}
