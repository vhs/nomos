import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import CreateSystemPreferenceButton from './CreateSystemPreferenceButton'

type StoryType = StoryObj<typeof CreateSystemPreferenceButton>

const meta: Meta<typeof CreateSystemPreferenceButton> = {
    component: CreateSystemPreferenceButton,
    title: '99-Templates/default',
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
        children: 'CreateSystemPreferenceButton'
    }
}
