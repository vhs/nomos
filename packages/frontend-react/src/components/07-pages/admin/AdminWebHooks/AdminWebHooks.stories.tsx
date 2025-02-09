import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminWebHooks from './AdminWebHooks'

type StoryType = StoryObj<typeof AdminWebHooks>

const meta: Meta<typeof AdminWebHooks> = {
    component: AdminWebHooks,
    title: '07-Pages/Admin/AdminWebHooks',
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
        children: 'AdminWebHooks'
    }
}
