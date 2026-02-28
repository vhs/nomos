import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import OAuth from './OAuth'

type StoryType = StoryObj<typeof OAuth>

const meta: Meta<typeof OAuth> = {
    component: OAuth,
    title: '07-Pages/Admin/OAuth',
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
        children: 'OAuth'
    }
}
