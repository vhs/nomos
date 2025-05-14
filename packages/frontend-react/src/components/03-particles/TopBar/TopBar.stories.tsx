import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import TopBar from './TopBar'

type StoryType = StoryObj<typeof TopBar>

const meta: Meta<typeof TopBar> = {
    component: TopBar,
    title: '03-Particles/TopBar',
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
        children: 'TopBar'
    }
}
