import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import MainLayout from './MainLayout'

type StoryType = StoryObj<typeof MainLayout>

const meta: Meta<typeof MainLayout> = {
    component: MainLayout,
    title: '06-Layouts/MainLayout',
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
        children: 'MainLayout'
    }
}
