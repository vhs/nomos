import { lazy, Suspense, type JSX } from 'react'

import type { AccessHistoryItemProps } from './AccessHistoryItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AccessHistoryItemLazy = lazy(async () => await import('./AccessHistoryItem'))

const AccessHistoryItem = (props: JSX.IntrinsicAttributes & AccessHistoryItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AccessHistoryItemLazy {...props} />
    </Suspense>
)

export default AccessHistoryItem
