import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import MembershipsEdit from './MembershipsEdit'

type StoryType = StoryObj<typeof MembershipsEdit>

const meta: Meta<typeof MembershipsEdit> = {
    component: MembershipsEdit,
    title: '07-Pages/Admin/Memberships/MembershipsEdit',
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
        children: 'MembershipsEdit'
    }
}
