import { lazy, Suspense, type JSX } from 'react'

import type { AdminStatusWidgetProps } from './AdminStatusWidget.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const LazyAdminStatusWidget = lazy(async () => await import('./AdminStatusWidget'))

const AdminStatusWidget = (props: JSX.IntrinsicAttributes & AdminStatusWidgetProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminStatusWidget {...props} />
    </Suspense>
)

export default AdminStatusWidget
