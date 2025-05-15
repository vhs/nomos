import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

// import { mockHandlers } from '@/lib/mocking/handlers'

import IPNRecords from './IPNRecords'

type StoryType = StoryObj<typeof IPNRecords>

const meta: Meta<typeof IPNRecords> = {
    component: IPNRecords,
    title: '07-Pages/Admin/IPNRecords',
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
        children: 'IPNRecords'
    }
}
