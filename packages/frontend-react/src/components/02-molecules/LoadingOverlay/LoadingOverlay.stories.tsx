import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import LoadingOverlay from './LoadingOverlay'

type StoryType = StoryObj<typeof LoadingOverlay>

const meta: Meta<typeof LoadingOverlay> = {
    component: LoadingOverlay,
    title: '02-Molecules/LoadingOverlay',
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
        show: true
    }
}
