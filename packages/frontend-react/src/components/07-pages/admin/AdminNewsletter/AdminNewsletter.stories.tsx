import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import AdminNewsletter from './AdminNewsletter'

type StoryType = StoryObj<typeof AdminNewsletter>

const meta: Meta<typeof AdminNewsletter> = {
    component: AdminNewsletter,
    title: '07-Pages/Admin/AdminNewsletter',
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
        children: 'AdminNewsletter'
    }
}
