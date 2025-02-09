import { lazy, Suspense, type JSX } from 'react'

import type { AdminEventsItemProps } from './AdminEventsItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminEventsItem = lazy(async () => await import('./AdminEventsItem'))

const AdminEventsItem = (props: JSX.IntrinsicAttributes & AdminEventsItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminEventsItem {...props} />
    </Suspense>
)

export default AdminEventsItem
