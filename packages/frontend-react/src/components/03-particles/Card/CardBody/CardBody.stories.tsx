import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import CardBody from './CardBody'

type StoryType = StoryObj<typeof CardBody>

const meta: Meta<typeof CardBody> = {
    component: CardBody,
    title: '03-Particles/Card/CardBody',
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
        children: 'CardBody'
    }
}
