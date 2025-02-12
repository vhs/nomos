import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminEventsItem from './AdminEventsItem'

type StoryType = StoryObj<typeof AdminEventsItem>

const meta: Meta<typeof AdminEventsItem> = {
    component: AdminEventsItem,
    title: '07-Pages/Admin/AdminEvents/AdminEventsItem',
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
        data: {
            id: 1,
            description: 'description',
            domain: 'domain',
            enabled: true,
            event: 'created',
            name: 'story'
        }
    }
}
