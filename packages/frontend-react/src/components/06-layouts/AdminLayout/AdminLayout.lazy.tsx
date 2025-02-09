import { lazy, Suspense, type JSX } from 'react'

import type { AdminLayoutProps } from './AdminLayout.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminLayout = lazy(async () => await import('./AdminLayout'))

const AdminLayout = (props: JSX.IntrinsicAttributes & AdminLayoutProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminLayout {...props} />
    </Suspense>
)

export default AdminLayout
