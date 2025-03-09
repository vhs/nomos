import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminSystemPreferencesItem from './AdminSystemPreferencesItem'

type StoryType = StoryObj<typeof AdminSystemPreferencesItem>

const meta: Meta<typeof AdminSystemPreferencesItem> = {
    component: AdminSystemPreferencesItem,
    title: '07-Pages/Admin/AdminSystemPreferences/AdminSystemPreferencesItem',
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
        data: {
            id: 1,
            value: 'AdminSystemPreferencesItem',
            key: 'AdminSystemPreferencesItem',
            enabled: true
        }
    }
}
