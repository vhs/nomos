import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ModalHeader from './ModalHeader'

type StoryType = StoryObj<typeof ModalHeader>

const meta: Meta<typeof ModalHeader> = {
    component: ModalHeader,
    title: '03-Particles/Modal/ModalHeader',
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
        children: 'ModalHeader'
    }
}
