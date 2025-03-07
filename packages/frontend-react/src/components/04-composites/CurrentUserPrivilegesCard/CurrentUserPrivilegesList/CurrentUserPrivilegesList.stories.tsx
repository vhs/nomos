import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import CurrentUserPrivilegesList from './CurrentUserPrivilegesList'

type StoryType = StoryObj<typeof CurrentUserPrivilegesList>

const meta: Meta<typeof CurrentUserPrivilegesList> = {
    component: CurrentUserPrivilegesList,
    title: '04-Composites/CurrentUserPrivilegesCard/CurrentUserPrivilegesList',
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
        children: 'CurrentUserPrivilegesList'
    }
}
