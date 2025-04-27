import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Memberships from './Memberships'

type StoryType = StoryObj<typeof Memberships>

const meta: Meta<typeof Memberships> = {
    component: Memberships,
    title: '07-Pages/Admin/Memberships',
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
    args: {}
}
