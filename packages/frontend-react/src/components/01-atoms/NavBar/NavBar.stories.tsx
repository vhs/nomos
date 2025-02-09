import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import NavBar from './NavBar'

type StoryType = StoryObj<typeof NavBar>

const meta: Meta<typeof NavBar> = {
    component: NavBar,
    title: '01-Atoms/NavBar',
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
        children: 'NavBar'
    }
}
