import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import Newsletter from './Newsletter'

type StoryType = StoryObj<typeof Newsletter>

const meta: Meta<typeof Newsletter> = {
    component: Newsletter,
    title: '07-Pages/Admin/Newsletter',
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
        children: 'Newsletter'
    }
}
