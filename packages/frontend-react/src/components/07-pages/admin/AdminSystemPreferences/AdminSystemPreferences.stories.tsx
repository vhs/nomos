import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminSystemPreferences from './AdminSystemPreferences'

type StoryType = StoryObj<typeof AdminSystemPreferences>

const meta: Meta<typeof AdminSystemPreferences> = {
    component: AdminSystemPreferences,
    title: '07-Pages/Admin/AdminSystemPreferences',
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
        children: 'AdminSystemPreferences'
    }
}
