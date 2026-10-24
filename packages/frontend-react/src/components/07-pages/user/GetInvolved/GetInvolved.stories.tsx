import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import GetInvolved from './GetInvolved'

type StoryType = StoryObj<typeof GetInvolved>

const meta: Meta<typeof GetInvolved> = {
    component: GetInvolved,
    title: '07-Pages/User/GetInvolved',
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
        children: 'GetInvolved'
    }
}
