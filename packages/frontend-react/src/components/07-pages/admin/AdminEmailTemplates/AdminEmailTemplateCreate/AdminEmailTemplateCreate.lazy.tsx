import { lazy, Suspense, type JSX } from 'react'

import type { AdminEmailTemplateCreateProps } from './AdminEmailTemplateCreate.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminEmailTemplateCreate = lazy(async () => await import('./AdminEmailTemplateCreate'))

const AdminEmailTemplateCreate = (props: JSX.IntrinsicAttributes & AdminEmailTemplateCreateProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminEmailTemplateCreate {...props} />
    </Suspense>
)

export default AdminEmailTemplateCreate
