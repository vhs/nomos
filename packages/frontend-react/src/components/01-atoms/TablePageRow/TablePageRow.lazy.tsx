import { lazy, Suspense, type JSX } from 'react'

import type { TablePageRowProps } from './TablePageRow.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyTablePageRow = lazy(async () => await import('./TablePageRow'))

const TablePageRow = (props: JSX.IntrinsicAttributes & TablePageRowProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTablePageRow {...props} />
    </Suspense>
)

export default TablePageRow
