import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Home from './Home'

type StoryType = StoryObj<typeof Home>

const meta: Meta<typeof Home> = {
    component: Home,
    title: '07-Pages/User/Home',
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
        children: 'Home'
    }
}
