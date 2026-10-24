import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeysListPage from './ApiKeysListPage'

type StoryType = StoryObj<typeof ApiKeysListPage>

const meta: Meta<typeof ApiKeysListPage> = {
    component: ApiKeysListPage,
    title: '07-integrated-Pages/ApiKeysPage/ApiKeysListPage',
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
        children: 'ApiKeysListPage'
    }
}
