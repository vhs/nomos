import type { FC } from 'react'

import type { MockServiceData } from './TablePage.types'
import type { Meta, StoryObj } from '@storybook/react'

import TablePageRow from '@/components/01-atoms/TablePageRow/TablePageRow'
import TableDataCell from '@/components/02-molecules/TableDataCell/TableDataCell'
import AuthenticationProvider from '@/components/09-providers/AuthenticationProvider/AuthenticationProvider'

import { mockHandlers } from '@/lib/mocking/handlers'

import TablePage from './TablePage'

type StoryType = StoryObj<typeof TablePage>

const MockDataComponent: FC<{ data: MockServiceData }> = ({ data: { id, color } }) => (
    <TablePageRow>
        <TableDataCell>{id}</TableDataCell>
        <TableDataCell>{color}</TableDataCell>
    </TablePageRow>
)

const meta: Meta<typeof TablePage> = {
    component: TablePage,
    title: '05-Materials/TablePage',
    decorators: [
        (Story) => (
            <AuthenticationProvider>
                <Story />
            </AuthenticationProvider>
        )
    ],
    parameters: {
        msw: {
            handlers: mockHandlers
        }
    }
}

export const Default: StoryType = {
    args: {
        title: '05-Materials/TablePage',
        label: 'storybook',
        serviceEndpoint: 'MockService2',
        baseServiceMethod: 'Mock',
        fields: [
            { title: 'ID', field: 'id' },
            { title: 'Color', field: 'color' }
        ],
        order: ['id'],
        // @ts-expect-error mismatch
        component: MockDataComponent,
        primaryFilters: [
            {
                id: 'red',
                label: 'Red',
                filter: {
                    column: 'color',
                    operator: '=',
                    value: 'red'
                }
            },
            {
                id: 'green',
                label: 'Green',
                filter: {
                    column: 'color',
                    operator: '=',
                    value: 'green'
                }
            },
            {
                id: 'blue',
                label: 'Blue',
                filter: {
                    column: 'color',
                    operator: '=',
                    value: 'blue'
                }
            }
        ]
    }
}

export const User: StoryType = {
    args: {
        ...Default.args,
        user: true
    }
}

export default meta
