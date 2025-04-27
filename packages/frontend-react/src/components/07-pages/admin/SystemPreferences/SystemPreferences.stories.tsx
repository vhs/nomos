import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import SystemPreferences from './SystemPreferences'

type StoryType = StoryObj<typeof SystemPreferences>

const meta: Meta<typeof SystemPreferences> = {
    component: SystemPreferences,
    title: '07-Pages/Admin/SystemPreferences',
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
        children: 'SystemPreferences'
    }
}
