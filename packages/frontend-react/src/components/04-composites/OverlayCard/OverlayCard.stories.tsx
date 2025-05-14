import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import OverlayCard from './OverlayCard'

type StoryType = StoryObj<typeof OverlayCard>

const meta: Meta<typeof OverlayCard> = {
    component: OverlayCard,
    title: '04-Composites/OverlayCard',
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
        children: 'OverlayCard'
    }
}
