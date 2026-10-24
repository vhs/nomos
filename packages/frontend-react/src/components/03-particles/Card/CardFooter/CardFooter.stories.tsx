import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import CardFooter from './CardFooter'

type StoryType = StoryObj<typeof CardFooter>

const meta: Meta<typeof CardFooter> = {
    component: CardFooter,
    title: '03-Particles/Card/CardFooter',
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
        children: 'CardFooter'
    }
}
