import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import { ExampleMenuItems } from '../Menu.utils'

import MenuItem from './MenuItem'

type StoryType = StoryObj<typeof MenuItem>

const meta: Meta<typeof MenuItem> = {
    component: MenuItem,
    title: '03-Particles/Menu/MenuItem',
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
    args: ExampleMenuItems[0]
}
