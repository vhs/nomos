import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import WaitingRoom from './WaitingRoom'

type StoryType = StoryObj<typeof WaitingRoom>

const meta: Meta<typeof WaitingRoom> = {
    component: WaitingRoom,
    title: '02-Molecules/WaitingRoom',
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
        children: 'WaitingRoom'
    }
}
