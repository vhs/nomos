import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import StatusSelectorCard from './StatusSelectorCard'

type StoryType = StoryObj<typeof StatusSelectorCard>

const meta: Meta<typeof StatusSelectorCard> = {
    component: StatusSelectorCard,
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
        children: 'StatusSelectorCard'
    }
}
