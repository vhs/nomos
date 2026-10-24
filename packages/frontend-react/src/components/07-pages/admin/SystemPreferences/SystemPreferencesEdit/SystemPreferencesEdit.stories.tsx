import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import SystemPreferencesEdit from './SystemPreferencesEdit'

type StoryType = StoryObj<typeof SystemPreferencesEdit>

const meta: Meta<typeof SystemPreferencesEdit> = {
    component: SystemPreferencesEdit,
    title: '07-Pages/Admin/SystemPreferences/SystemPreferencesEdit',
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
        children: 'SystemPreferencesEdit'
    }
}
