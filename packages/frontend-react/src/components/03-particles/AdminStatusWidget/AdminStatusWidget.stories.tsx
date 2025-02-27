import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminStatusWidget from './AdminStatusWidget'

type StoryType = StoryObj<typeof AdminStatusWidget>

const meta: Meta<typeof AdminStatusWidget> = {
    component: AdminStatusWidget,
    title: '03-Particles/AdminStatusWidget',
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
        variant: 'green',
        icon: 'users',
        description: 'Users',
        count: 123,
        details: '123 Users'
    }
}
