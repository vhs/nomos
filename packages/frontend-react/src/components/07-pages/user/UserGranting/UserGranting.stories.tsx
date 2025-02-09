import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserGranting from './UserGranting'

type StoryType = StoryObj<typeof UserGranting>

const meta: Meta<typeof UserGranting> = {
    component: UserGranting,
    title: '07-Pages/User/UserGranting',
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
        children: 'UserGranting'
    }
}
