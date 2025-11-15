import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AccessHistory from './AccessHistory'

type StoryType = StoryObj<typeof AccessHistory>

const meta: Meta<typeof AccessHistory> = {
    component: AccessHistory,
    title: '07-Pages/User/AccessHistory',
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
        children: 'AccessHistory'
    }
}
