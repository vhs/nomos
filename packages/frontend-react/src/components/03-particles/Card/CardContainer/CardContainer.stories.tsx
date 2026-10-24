import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import CardContainer from './CardContainer'

type StoryType = StoryObj<typeof CardContainer>

const meta: Meta<typeof CardContainer> = {
    component: CardContainer,
    title: '03-Particles/Card/CardContainer',
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
        children: 'CardContainer'
    }
}
