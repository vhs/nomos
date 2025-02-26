import { lazy, Suspense, type JSX } from 'react'

import type { AdminSystemPreferencesEditProps } from './AdminSystemPreferencesEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminSystemPreferencesEdit = lazy(async () => await import('./AdminSystemPreferencesEdit'))

const AdminSystemPreferencesEdit = (props: JSX.IntrinsicAttributes & AdminSystemPreferencesEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminSystemPreferencesEdit {...props} />
    </Suspense>
)

export default AdminSystemPreferencesEdit
