import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import Menu from './Menu'
import { ExampleMenuItems } from './Menu.utils'

type StoryType = StoryObj<typeof Menu>

const meta: Meta<typeof Menu> = {
    component: Menu,
    title: '03-Particles/Menu',
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
        menuItems: ExampleMenuItems
    }
}
