import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ModalContainer from './ModalContainer'

type StoryType = StoryObj<typeof ModalContainer>

const meta: Meta<typeof ModalContainer> = {
    component: ModalContainer,
    title: '04-Composites/Modal/ModalContainer',
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
        children: 'ModalContainer'
    }
}
