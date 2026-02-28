import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import CurrentUserPrivilegesCard from './CurrentUserPrivilegesCard'
import { mockCurrentUser } from './CurrentUserPrivilegesCard.mocks'

type StoryType = StoryObj<typeof CurrentUserPrivilegesCard>

const meta: Meta<typeof CurrentUserPrivilegesCard> = {
    component: CurrentUserPrivilegesCard,
    title: '04-Composites/CurrentUserPrivilegesCard',
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
        currentUser: mockCurrentUser
    }
}
