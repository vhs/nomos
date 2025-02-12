import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import PrivilegeIcon from './PrivilegeIcon'

type StoryType = StoryObj<typeof PrivilegeIcon>

const meta: Meta<typeof PrivilegeIcon> = {
    component: PrivilegeIcon,
    title: '02-Molecules/PrivilegeIcon',
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
        icon: 'air-freshener'
    }
}
