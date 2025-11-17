import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeys from './ApiKeys'

type StoryType = StoryObj<typeof ApiKeys>

const meta: Meta<typeof ApiKeys> = {
    component: ApiKeys,
    title: '07-Pages/Admin/ApiKeys',
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
        children: 'ApiKeys'
    }
}
