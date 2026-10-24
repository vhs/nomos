import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Granting from './Granting'

type StoryType = StoryObj<typeof Granting>

const meta: Meta<typeof Granting> = {
    component: Granting,
    title: '07-Pages/User/Granting',
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
        children: 'Granting'
    }
}
