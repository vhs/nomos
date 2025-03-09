import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import UserGetInvolved from './UserGetInvolved'

type StoryType = StoryObj<typeof UserGetInvolved>

const meta: Meta<typeof UserGetInvolved> = {
    component: UserGetInvolved,
    title: '07-Pages/User/UserGetInvolved',
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
        children: 'UserGetInvolved'
    }
}
