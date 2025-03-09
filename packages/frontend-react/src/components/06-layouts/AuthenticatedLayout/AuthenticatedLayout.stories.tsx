import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import AuthenticatedLayout from './AuthenticatedLayout'

type StoryType = StoryObj<typeof AuthenticatedLayout>

const meta: Meta<typeof AuthenticatedLayout> = {
    component: AuthenticatedLayout,
    title: '06-Layouts/AuthenticatedLayout',
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
        children: 'AuthenticatedLayout'
    }
}
