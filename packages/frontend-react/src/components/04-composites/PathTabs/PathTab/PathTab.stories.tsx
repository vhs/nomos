import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import PathTab from './PathTab'

type StoryType = StoryObj<typeof PathTab>

const meta: Meta<typeof PathTab> = {
    component: PathTab,
    title: '04-Composites/PathTabs/PathTab',
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
        children: 'PathTab'
    }
}
