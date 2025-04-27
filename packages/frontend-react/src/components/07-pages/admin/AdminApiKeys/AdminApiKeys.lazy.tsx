import { lazy, Suspense, type JSX } from 'react'

import type { AdminApiKeysProps } from './AdminApiKeys.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminApiKeysLazy = lazy(async () => await import('./AdminApiKeys'))

const AdminApiKeys = (props: JSX.IntrinsicAttributes & AdminApiKeysProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminApiKeysLazy {...props} />
    </Suspense>
)

export default AdminApiKeys
