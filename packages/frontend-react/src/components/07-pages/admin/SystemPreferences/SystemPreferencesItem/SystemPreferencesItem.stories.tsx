import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import SystemPreferencesItem from './SystemPreferencesItem'

type StoryType = StoryObj<typeof SystemPreferencesItem>

const meta: Meta<typeof SystemPreferencesItem> = {
    component: SystemPreferencesItem,
    title: '07-Pages/Admin/SystemPreferences/SystemPreferencesItem',
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
            value: 'SystemPreferencesItem',
            key: 'SystemPreferencesItem',
            enabled: true
        }
    }
}
