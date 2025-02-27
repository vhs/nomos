import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminSystemPreferencesEdit from './AdminSystemPreferencesEdit'

type StoryType = StoryObj<typeof AdminSystemPreferencesEdit>

const meta: Meta<typeof AdminSystemPreferencesEdit> = {
    component: AdminSystemPreferencesEdit,
    title: '07-Pages/Admin/AdminSystemPreferences/AdminSystemPreferencesEdit',
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
        children: 'AdminSystemPreferencesEdit'
    }
}
