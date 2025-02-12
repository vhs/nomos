import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import CreateSystemPreference from './CreateSystemPreference'

type StoryType = StoryObj<typeof CreateSystemPreference>

const meta: Meta<typeof CreateSystemPreference> = {
    component: CreateSystemPreference,
    title: '07-Pages/Admin/AdminSystemPreferences/CreateSystemPreference',
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
        children: 'CreateSystemPreference'
    }
}
