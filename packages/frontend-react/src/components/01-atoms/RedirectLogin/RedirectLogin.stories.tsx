import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import RedirectLogin from './RedirectLogin'

type StoryType = StoryObj<typeof RedirectLogin>

const meta: Meta<typeof RedirectLogin> = {
    component: RedirectLogin,
    title: '01-Atoms/RedirectLogin',
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
        children: 'RedirectLogin'
    }
}
