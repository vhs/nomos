import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import CreateUserButton from './CreateUserButton'

type StoryType = StoryObj<typeof CreateUserButton>

const meta: Meta<typeof CreateUserButton> = {
    component: CreateUserButton,
    title: '01-Atoms/CreateUserButton',
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
        children: 'CreateUserButton'
    }
}
