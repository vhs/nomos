import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ApiKeysPageContainer from './ApiKeysPageContainer'

type StoryType = StoryObj<typeof ApiKeysPageContainer>

const meta: Meta<typeof ApiKeysPageContainer> = {
    component: ApiKeysPageContainer,
    title: '06-integrated-Pages/ApiKeysPage/ApiKeysPageContainer',
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
        children: 'ApiKeysPageContainer'
    }
}
