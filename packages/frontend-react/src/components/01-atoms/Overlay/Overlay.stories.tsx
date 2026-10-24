import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Overlay from './Overlay'

type StoryType = StoryObj<typeof Overlay>

const meta: Meta<typeof Overlay> = {
    component: Overlay,
    title: '01-Atoms/Overlay',
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
        children: 'Overlay'
    }
}
