import type { Meta, StoryObj } from '@storybook/react'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import ConditionalTableCell from './ConditionalTableCell'

type StoryType = StoryObj<typeof ConditionalTableCell>

const meta: Meta<typeof ConditionalTableCell> = {
    component: ConditionalTableCell,
    title: '02-Molecules/ConditionalTableCell',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        condition: true,
        fallback: 'nope',
        children: 'ConditionalTableCell'
    }
}
