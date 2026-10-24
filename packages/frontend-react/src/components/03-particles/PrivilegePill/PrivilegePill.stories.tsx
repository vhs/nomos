import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import PrivilegePill from './PrivilegePill'

type StoryType = StoryObj<typeof PrivilegePill>

const meta: Meta<typeof PrivilegePill> = {
    component: PrivilegePill,
    title: '03-Particles/PrivilegePill',
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
        privilege: {
            id: 1,
            code: 'test',
            name: 'Test',
            enabled: false
        }
    }
}
