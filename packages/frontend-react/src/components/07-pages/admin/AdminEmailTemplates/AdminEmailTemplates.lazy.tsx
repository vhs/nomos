import { lazy, Suspense, type JSX } from 'react'

import type { AdminEmailTemplatesProps } from './AdminEmailTemplates.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminEmailTemplatesLazy = lazy(async () => await import('./AdminEmailTemplates'))

const AdminEmailTemplates = (props: JSX.IntrinsicAttributes & AdminEmailTemplatesProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminEmailTemplatesLazy {...props} />
    </Suspense>
)

export default AdminEmailTemplates
