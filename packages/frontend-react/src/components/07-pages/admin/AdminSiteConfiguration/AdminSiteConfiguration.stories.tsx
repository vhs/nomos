import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminSiteConfiguration from './AdminSiteConfiguration'

type StoryType = StoryObj<typeof AdminSiteConfiguration>

const meta: Meta<typeof AdminSiteConfiguration> = {
    component: AdminSiteConfiguration,
    title: '07-Pages/Admin/AdminSiteConfiguration',
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
        children: 'AdminSiteConfiguration'
    }
}
