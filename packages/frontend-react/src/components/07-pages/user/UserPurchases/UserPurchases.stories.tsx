import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserPurchases from './UserPurchases'

type StoryType = StoryObj<typeof UserPurchases>

const meta: Meta<typeof UserPurchases> = {
    component: UserPurchases,
    title: '07-Pages/User/UserPurchases',
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
        children: 'UserPurchases'
    }
}
