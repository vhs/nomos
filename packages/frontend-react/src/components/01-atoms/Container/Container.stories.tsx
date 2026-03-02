import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Container from './Container'

type StoryType = StoryObj<typeof Container>

const meta: Meta<typeof Container> = {
    component: Container,
    title: '01-Atoms/Container',
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
        children: 'Container'
    }
}
