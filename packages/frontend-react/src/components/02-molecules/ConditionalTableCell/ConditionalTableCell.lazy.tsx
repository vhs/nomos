import { lazy, Suspense, type JSX } from 'react'

import type { ConditionalTableCellProps } from './ConditionalTableCell.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyConditionalTableCell = lazy(async () => await import('./ConditionalTableCell'))

const ConditionalTableCell = (props: JSX.IntrinsicAttributes & ConditionalTableCellProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyConditionalTableCell {...props} />
    </Suspense>
)

export default ConditionalTableCell
