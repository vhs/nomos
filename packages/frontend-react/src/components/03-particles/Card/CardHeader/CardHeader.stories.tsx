import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import CardHeader from './CardHeader'

type StoryType = StoryObj<typeof CardHeader>

const meta: Meta<typeof CardHeader> = {
    component: CardHeader,
    title: '03-Particles/Card/CardHeader',
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
        children: 'CardHeader'
    }
}
