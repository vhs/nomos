import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import RedirectRoot from './RedirectRoot'

type StoryType = StoryObj<typeof RedirectRoot>

const meta: Meta<typeof RedirectRoot> = {
    component: RedirectRoot,
    title: '01-Atoms/RedirectRoot',
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
        children: 'RedirectRoot'
    }
}
