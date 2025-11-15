import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Tab from './Tab'

type StoryType = StoryObj<typeof Tab>

const meta: Meta<typeof Tab> = {
    component: Tab,
    title: '04-Composites/Tabs/Tab',
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
        children: 'Tab'
    }
}
