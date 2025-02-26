import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AdminSystemPreferencesNew from './AdminSystemPreferencesNew'

type StoryType = StoryObj<typeof AdminSystemPreferencesNew>

const meta: Meta<typeof AdminSystemPreferencesNew> = {
    component: AdminSystemPreferencesNew,
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
        children: 'AdminSystemPreferencesNew'
    }
}
