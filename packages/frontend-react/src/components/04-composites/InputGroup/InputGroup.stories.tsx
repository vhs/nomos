import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import InputGroup from './InputGroup'

type StoryType = StoryObj<typeof InputGroup>

const meta: Meta<typeof InputGroup> = {
    component: InputGroup,
    title: '04-Composites/InputGroup',
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
        children: 'InputGroup'
    }
}
