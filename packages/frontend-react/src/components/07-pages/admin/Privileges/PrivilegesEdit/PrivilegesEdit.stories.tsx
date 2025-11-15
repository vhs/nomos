import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import PrivilegesEdit from './PrivilegesEdit'

type StoryType = StoryObj<typeof PrivilegesEdit>

const meta: Meta<typeof PrivilegesEdit> = {
    component: PrivilegesEdit,
    title: '07-Pages/Admin/Privileges/PrivilegesEdit',
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
        children: 'PrivilegesEdit'
    }
}
