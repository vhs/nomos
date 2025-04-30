import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ConfigProvider from './ConfigProvider'

type StoryType = StoryObj<typeof ConfigProvider>

const meta: Meta<typeof ConfigProvider> = {
    component: ConfigProvider,
    title: '09-Providers/ConfigProvider',
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
        children: 'ConfigProvider'
    }
}
