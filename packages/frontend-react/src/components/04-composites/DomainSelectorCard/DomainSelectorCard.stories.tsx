import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import DomainSelectorCard from './DomainSelectorCard'

type StoryType = StoryObj<typeof DomainSelectorCard>

const meta: Meta<typeof DomainSelectorCard> = {
    component: DomainSelectorCard,
    title: '04-Composites/DomainSelectorCard',
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
        children: 'DomainSelectorCard'
    }
}
