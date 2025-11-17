import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import TableDataCell from './TableDataCell'

type StoryType = StoryObj<typeof TableDataCell>

const meta: Meta<typeof TableDataCell> = {
    component: TableDataCell,
    title: '02-Molecules/TableDataCell',
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
        children: 'TableDataCell'
    }
}
