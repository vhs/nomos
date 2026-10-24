import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import UserProfileCard from './UserProfileCard'

type StoryType = StoryObj<typeof UserProfileCard>

const meta: Meta<typeof UserProfileCard> = {
    component: UserProfileCard,
    title: '02-Molecules/UserProfileCard',
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
        children: 'UserProfileCard'
    }
}
