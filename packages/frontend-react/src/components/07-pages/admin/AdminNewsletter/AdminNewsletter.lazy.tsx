import { lazy, Suspense, type JSX } from 'react'

import type { AdminNewsletterProps } from './AdminNewsletter.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminNewsletter = lazy(async () => await import('./AdminNewsletter'))

const AdminNewsletter = (props: JSX.IntrinsicAttributes & AdminNewsletterProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminNewsletter {...props} />
    </Suspense>
)

export default AdminNewsletter
