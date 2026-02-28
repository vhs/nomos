import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ModalFooter from './ModalFooter'

type StoryType = StoryObj<typeof ModalFooter>

const meta: Meta<typeof ModalFooter> = {
    component: ModalFooter,
    title: '03-Particles/Modal/ModalFooter',
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
        children: 'ModalFooter'
    }
}
