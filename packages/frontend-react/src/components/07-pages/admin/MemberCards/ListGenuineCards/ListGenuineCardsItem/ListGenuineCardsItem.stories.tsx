import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ListGenuineCardsItem from './ListGenuineCardsItem'

type StoryType = StoryObj<typeof ListGenuineCardsItem>

const meta: Meta<typeof ListGenuineCardsItem> = {
    component: ListGenuineCardsItem,
    title: '07-Pages/Admin/MemberCards/ListGenuineCards/ListGenuineCardsItem',
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
    args: {}
}
