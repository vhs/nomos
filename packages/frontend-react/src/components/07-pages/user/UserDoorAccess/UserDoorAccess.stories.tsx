import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserDoorAccess from './UserDoorAccess'

type StoryType = StoryObj<typeof UserDoorAccess>

const meta: Meta<typeof UserDoorAccess> = {
    component: UserDoorAccess,
    title: '07-Pages/User/UserDoorAccess',
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
        children: 'UserDoorAccess'
    }
}
