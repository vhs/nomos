import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import MembershipSelectorCard from './MembershipSelectorCard'

type StoryType = StoryObj<typeof MembershipSelectorCard>

const meta: Meta<typeof MembershipSelectorCard> = {
    component: MembershipSelectorCard,
    title: '04-Composites/MembershipSelectorCard',
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
        children: 'MembershipSelectorCard'
    }
}
