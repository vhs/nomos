import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ListGenuineCards from './ListGenuineCards'

type StoryType = StoryObj<typeof ListGenuineCards>

const meta: Meta<typeof ListGenuineCards> = {
    component: ListGenuineCards,
    title: '07-Pages/Admin/AdminMemberCards/ListGenuineCards',
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
        children: 'ListGenuineCards'
    }
}
