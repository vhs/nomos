import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ApiKeysHelpPage from './ApiKeysHelpPage'

type StoryType = StoryObj<typeof ApiKeysHelpPage>

const meta: Meta<typeof ApiKeysHelpPage> = {
    component: ApiKeysHelpPage,
    title: '05-Materials/ApiKeysPage/ApiKeysHelpPage',
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
        children: 'ApiKeyHelp'
    }
}
