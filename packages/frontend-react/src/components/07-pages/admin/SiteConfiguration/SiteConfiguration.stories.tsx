import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import SiteConfiguration from './SiteConfiguration'

type StoryType = StoryObj<typeof SiteConfiguration>

const meta: Meta<typeof SiteConfiguration> = {
    component: SiteConfiguration,
    title: '07-Pages/Admin/SiteConfiguration',
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
        children: 'SiteConfiguration'
    }
}
