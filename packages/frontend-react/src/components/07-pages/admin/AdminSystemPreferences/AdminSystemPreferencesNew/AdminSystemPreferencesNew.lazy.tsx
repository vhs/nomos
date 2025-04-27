import { lazy, Suspense, type JSX } from 'react'

import type { AdminSystemPreferencesNewProps } from './AdminSystemPreferencesNew.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminSystemPreferencesNewLazy = lazy(async () => await import('./AdminSystemPreferencesNew'))

const AdminSystemPreferencesNew = (props: JSX.IntrinsicAttributes & AdminSystemPreferencesNewProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminSystemPreferencesNewLazy {...props} />
    </Suspense>
)

export default AdminSystemPreferencesNew
