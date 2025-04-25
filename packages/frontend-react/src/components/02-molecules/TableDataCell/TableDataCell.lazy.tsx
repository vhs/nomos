import { lazy, Suspense, type JSX } from 'react'

import type { TableDataCellProps } from './TableDataCell.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyTableDataCell = lazy(async () => await import('./TableDataCell'))

const TableDataCell = (props: JSX.IntrinsicAttributes & TableDataCellProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTableDataCell {...props} />
    </Suspense>
)

export default TableDataCell
