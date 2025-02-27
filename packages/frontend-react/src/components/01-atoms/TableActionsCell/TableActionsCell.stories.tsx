import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import TableActionsCell from './TableActionsCell'

type StoryType = StoryObj<typeof TableActionsCell>

const meta: Meta<typeof TableActionsCell> = {
    component: TableActionsCell,
    title: '01-Atoms/TableActionsCell',
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
        children: 'TableActionsCell'
    }
}
