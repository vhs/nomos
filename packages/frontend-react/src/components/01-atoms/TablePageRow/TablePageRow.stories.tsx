import type { Meta, StoryObj } from '@storybook/react'

import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'

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
            <TableDataCell key='Cell1' condition={true}>
                Cell1
            </TableDataCell>,
            <TableDataCell key='Cell2' condition={true}>
                Cell2
            </TableDataCell>
        ]
    }
}
