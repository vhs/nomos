import { lazy, Suspense, type JSX } from 'react'

import type { AdminSystemPreferencesItemProps } from './AdminSystemPreferencesItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminSystemPreferencesItemLazy = lazy(async () => await import('./AdminSystemPreferencesItem'))

const AdminSystemPreferencesItem = (props: JSX.IntrinsicAttributes & AdminSystemPreferencesItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminSystemPreferencesItemLazy {...props} />
    </Suspense>
)

export default AdminSystemPreferencesItem
