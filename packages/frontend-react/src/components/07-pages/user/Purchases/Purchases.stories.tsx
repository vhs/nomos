import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Purchases from './Purchases'

type StoryType = StoryObj<typeof Purchases>

const meta: Meta<typeof Purchases> = {
    component: Purchases,
    title: '07-Pages/User/Purchases',
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
        children: 'Purchases'
    }
}
