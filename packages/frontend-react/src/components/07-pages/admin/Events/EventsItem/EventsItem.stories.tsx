import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import EventsItem from './EventsItem'

type StoryType = StoryObj<typeof EventsItem>

const meta: Meta<typeof EventsItem> = {
    component: EventsItem,
    title: '07-Pages/Admin/Events/EventsItem',
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
