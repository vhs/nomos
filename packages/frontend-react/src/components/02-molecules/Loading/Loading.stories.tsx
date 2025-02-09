import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Loading from './Loading'

type StoryType = StoryObj<typeof Loading>

const meta: Meta<typeof Loading> = {
    component: Loading,
    title: '02-Molecules/Loading',
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
        children: 'Loading'
    }
}
