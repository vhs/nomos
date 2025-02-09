import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import MobileMenu from './MobileMenu'
import { ExampleMenuItems } from './MobileMenu.utils'

type StoryType = StoryObj<typeof MobileMenu>

const meta: Meta<typeof MobileMenu> = {
    component: MobileMenu,
    title: '05-Materials/MobileMenu',
    decorators: [
        (Story) => (
            <AuthenticationProvider>
                <Story />
            </AuthenticationProvider>
        )
    ]
}

export default meta

export const Admin: StoryType = {
    args: {
        admin: true,
        menuItems: ExampleMenuItems
    }
}

export const User: StoryType = {
    args: {
        menuItems: ExampleMenuItems
    }
}
