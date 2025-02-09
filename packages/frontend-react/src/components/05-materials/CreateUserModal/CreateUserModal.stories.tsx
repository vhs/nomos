import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import CreateUserModal from './CreateUserModal'

type StoryType = StoryObj<typeof CreateUserModal>

const meta: Meta<typeof CreateUserModal> = {
    component: CreateUserModal,
    title: '05-Materials/CreateUserModal',
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
        children: 'CreateUserModal'
    }
}
