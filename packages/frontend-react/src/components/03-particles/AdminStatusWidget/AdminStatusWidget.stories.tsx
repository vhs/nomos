import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminStatusWidget from './AdminStatusWidget'

type StoryType = StoryObj<typeof AdminStatusWidget>

const meta: Meta<typeof AdminStatusWidget> = {
    component: AdminStatusWidget,
    title: '99-Templates/default',
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
        children: 'AdminStatusWidget'
    }
}
