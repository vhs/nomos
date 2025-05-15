import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import MemberCards from './MemberCards'

type StoryType = StoryObj<typeof MemberCards>

const meta: Meta<typeof MemberCards> = {
    component: MemberCards,
    title: '07-Pages/Admin/MemberCards',
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
        children: 'MemberCards'
    }
}
