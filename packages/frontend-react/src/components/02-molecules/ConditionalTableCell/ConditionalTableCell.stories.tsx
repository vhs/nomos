import type { Meta, StoryObj } from '@storybook/react'

import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import ConditionalTableCell from './ConditionalTableCell'

type StoryType = StoryObj<typeof ConditionalTableCell>

const meta: Meta<typeof ConditionalTableCell> = {
    component: ConditionalTableCell,
    title: '02-Molecules/ConditionalTableCell',
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
        children: 'ConditionalTableCell'
    }
}
