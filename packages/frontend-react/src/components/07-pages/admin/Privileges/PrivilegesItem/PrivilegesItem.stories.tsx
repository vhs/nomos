import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import PrivilegesItem from './PrivilegesItem'

type StoryType = StoryObj<typeof PrivilegesItem>

const meta: Meta<typeof PrivilegesItem> = {
    component: PrivilegesItem,
    title: '07-Pages/Admin/Privileges/PrivilegesItem',
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
