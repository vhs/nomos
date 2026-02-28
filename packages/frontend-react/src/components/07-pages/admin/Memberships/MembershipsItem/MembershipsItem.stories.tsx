import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import MembershipsItem from './MembershipsItem'

type StoryType = StoryObj<typeof MembershipsItem>

const meta: Meta<typeof MembershipsItem> = {
    component: MembershipsItem,
    title: '07-Pages/Admin/Memberships/MembershipsItem',
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
