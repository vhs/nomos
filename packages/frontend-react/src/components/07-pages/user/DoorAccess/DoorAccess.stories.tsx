import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import DoorAccess from './DoorAccess'

type StoryType = StoryObj<typeof DoorAccess>

const meta: Meta<typeof DoorAccess> = {
    component: DoorAccess,
    title: '07-Pages/User/DoorAccess',
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
        children: 'DoorAccess'
    }
}
