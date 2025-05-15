import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Popover from './Popover'

type StoryType = StoryObj<typeof Popover>

const meta: Meta<typeof Popover> = {
    component: Popover,
    title: '01-Atoms/Popover',
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
        content: 'Popover',
        popover: 'Popover Content'
    }
}
