import { lazy, Suspense, type JSX } from 'react'

import type { TableActionsCellProps } from './TableActionsCell.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyTableActionsCell = lazy(async () => await import('./TableActionsCell'))

const TableActionsCell = (props: JSX.IntrinsicAttributes & TableActionsCellProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyTableActionsCell {...props} />
    </Suspense>
)

export default TableActionsCell
