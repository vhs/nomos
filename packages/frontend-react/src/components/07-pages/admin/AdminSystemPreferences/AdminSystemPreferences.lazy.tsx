import { lazy, Suspense, type JSX } from 'react'

import type { AdminSystemPreferencesProps } from './AdminSystemPreferences.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminSystemPreferences = lazy(async () => await import('./AdminSystemPreferences'))

const AdminSystemPreferences = (props: JSX.IntrinsicAttributes & AdminSystemPreferencesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminSystemPreferences {...props} />
    </Suspense>
)

export default AdminSystemPreferences
