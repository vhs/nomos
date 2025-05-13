import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ApiKeysUsagePage from './ApiKeysUsagePage'

type StoryType = StoryObj<typeof ApiKeysUsagePage>

const meta: Meta<typeof ApiKeysUsagePage> = {
    component: ApiKeysUsagePage,
    title: '06-integrated-Pages/ApiKeysPage/ApiKeysUsagePage',
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
        children: 'ApiKeysUsagePage'
    }
}
