import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Reports from './Reports'

type StoryType = StoryObj<typeof Reports>

const meta: Meta<typeof Reports> = {
    component: Reports,
    title: '07-Pages/Admin/Reports',
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
        children: 'Reports'
    }
}
