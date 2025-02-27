import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminMemberCards from './AdminMemberCards'

type StoryType = StoryObj<typeof AdminMemberCards>

const meta: Meta<typeof AdminMemberCards> = {
    component: AdminMemberCards,
    title: '07-Pages/Admin/AdminMemberCards',
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
        children: 'AdminMemberCards'
    }
}
