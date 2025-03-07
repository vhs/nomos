import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import PrivilegePill from './PrivilegePill'

type StoryType = StoryObj<typeof PrivilegePill>

const meta: Meta<typeof PrivilegePill> = {
    component: PrivilegePill,
    title: '02-Molecules/PrivilegePill',
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
        children: 'PrivilegePill'
    }
}
