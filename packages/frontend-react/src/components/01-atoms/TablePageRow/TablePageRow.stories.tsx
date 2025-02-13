import type { Meta, StoryObj } from '@storybook/react'

import ConditionalTableCell from '@/components/02-molecules/ConditionalTableCell/ConditionalTableCell'

import { CenteredContentStorybookDecorator } from '@/lib/ui/storybook'

import TablePageRow from './TablePageRow'

type StoryType = StoryObj<typeof TablePageRow>

const meta: Meta<typeof TablePageRow> = {
    component: TablePageRow,
    title: '01-Atoms/TablePageRow',
    decorators: [CenteredContentStorybookDecorator]
}

export default meta

export const Default: StoryType = {
    args: {
        children: [
            <ConditionalTableCell key='Cell1' condition={true}>
                Cell1
            </ConditionalTableCell>,
            <ConditionalTableCell key='Cell2' condition={true}>
                Cell2
            </ConditionalTableCell>
        ]
    }
}
