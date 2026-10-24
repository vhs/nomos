import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import EnabledCheckMark from './EnabledCheckMark'

type StoryType = StoryObj<typeof EnabledCheckMark>

const meta: Meta<typeof EnabledCheckMark> = {
    component: EnabledCheckMark,
    title: '02-Molecules/EnabledCheckMark',
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
        checked: true
    }
}

export const Checked: StoryType = {
    args: {
        checked: true
    }
}

export const Unchecked: StoryType = {
    args: {
        checked: false
    }
}
