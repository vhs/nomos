import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import SelectorCard from './SelectorCard'

type StoryType = StoryObj<typeof SelectorCard>

const meta: Meta<typeof SelectorCard> = {
    component: SelectorCard,
    title: '04-Composites/SelectorCard',
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
        children: 'SelectorCard'
    }
}
