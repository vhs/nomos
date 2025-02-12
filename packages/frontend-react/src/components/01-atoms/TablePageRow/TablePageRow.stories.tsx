import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import TablePageRow from './TablePageRow'

type StoryType = StoryObj<typeof TablePageRow>

const meta: Meta<typeof TablePageRow> = {
    component: TablePageRow,
    title: '01-Atoms/TablePageRow',
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
        children: 'TablePageRow'
    }
}
