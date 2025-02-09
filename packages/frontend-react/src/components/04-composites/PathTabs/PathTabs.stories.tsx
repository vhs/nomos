import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import PathTabs from './PathTabs'

type StoryType = StoryObj<typeof PathTabs>

const meta: Meta<typeof PathTabs> = {
    component: PathTabs,
    title: '04-Composites/PathTabs',
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
    args: {}
}
