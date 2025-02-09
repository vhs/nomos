import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ModalBody from './ModalBody'

type StoryType = StoryObj<typeof ModalBody>

const meta: Meta<typeof ModalBody> = {
    component: ModalBody,
    title: '04-Composites/Modal/ModalBody',
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
        children: 'ModalBody'
    }
}
