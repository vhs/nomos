import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import SystemPreferencesNew from './SystemPreferencesNew'

type StoryType = StoryObj<typeof SystemPreferencesNew>

const meta: Meta<typeof SystemPreferencesNew> = {
    component: SystemPreferencesNew,
    title: '07-Pages/Admin/SystemPreferences/SystemPreferencesNew',
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
        children: 'SystemPreferencesNew'
    }
}
