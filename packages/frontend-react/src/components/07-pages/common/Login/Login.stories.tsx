import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Login from './Login'

type StoryType = StoryObj<typeof Login>

const meta: Meta<typeof Login> = {
    component: Login,
    title: '07-Pages/common/Login',
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
        children: 'Login'
    }
}
