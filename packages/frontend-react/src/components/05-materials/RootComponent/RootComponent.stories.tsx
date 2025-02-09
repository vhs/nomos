import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import RootComponent from './RootComponent'

type StoryType = StoryObj<typeof RootComponent>

const meta: Meta<typeof RootComponent> = {
    component: RootComponent,
    title: '05-Materials/RootComponent',
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
        children: 'RootComponent'
    }
}
