import { lazy, Suspense, type JSX } from 'react'

import type { UserAccessHistoryItemProps } from './UserAccessHistoryItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUserAccessHistoryItem = lazy(async () => await import('./UserAccessHistoryItem'))

const UserAccessHistoryItem = (props: JSX.IntrinsicAttributes & UserAccessHistoryItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUserAccessHistoryItem {...props} />
    </Suspense>
)

export default UserAccessHistoryItem
