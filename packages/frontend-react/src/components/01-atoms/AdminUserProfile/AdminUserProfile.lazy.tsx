import { lazy, Suspense, type JSX } from 'react'

import type { AdminUserProfileProps } from './AdminUserProfile.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminUserProfile = lazy(async () => await import('./AdminUserProfile'))

const AdminUserProfile = (props: JSX.IntrinsicAttributes & AdminUserProfileProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminUserProfile {...props} />
    </Suspense>
)

export default AdminUserProfile
