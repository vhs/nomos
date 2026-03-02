import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Privileges from './Privileges'

type StoryType = StoryObj<typeof Privileges>

const meta: Meta<typeof Privileges> = {
    component: Privileges,
    title: '07-Pages/Admin/Privileges',
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
        children: 'Privileges'
    }
}
