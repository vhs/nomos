import { lazy, Suspense, type JSX } from 'react'

import type { AdminEventsProps } from './AdminEvents.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminEventsLazy = lazy(async () => await import('./AdminEvents'))

const AdminEvents = (props: JSX.IntrinsicAttributes & AdminEventsProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminEventsLazy {...props} />
    </Suspense>
)

export default AdminEvents
