import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import RegisterGenuineCard from './RegisterGenuineCard'

type StoryType = StoryObj<typeof RegisterGenuineCard>

const meta: Meta<typeof RegisterGenuineCard> = {
    component: RegisterGenuineCard,
    title: '07-Pages/Admin/MemberCards/RegisterGenuineCard',
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
        children: 'RegisterGenuineCard'
    }
}
