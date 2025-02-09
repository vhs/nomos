import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import ModalTitle from './ModalTitle'

type StoryType = StoryObj<typeof ModalTitle>

const meta: Meta<typeof ModalTitle> = {
    component: ModalTitle,
    title: '04-Composites/Modal/ModalTitle',
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
        children: 'ModalTitle'
    }
}
