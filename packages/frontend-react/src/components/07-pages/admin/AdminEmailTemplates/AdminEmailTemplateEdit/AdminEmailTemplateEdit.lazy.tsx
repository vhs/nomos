import { lazy, Suspense, type JSX } from 'react'

import type { AdminEmailTemplateEditProps } from './AdminEmailTemplateEdit.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminEmailTemplateEditLazy = lazy(async () => await import('./AdminEmailTemplateEdit'))

const AdminEmailTemplateEdit = (props: JSX.IntrinsicAttributes & AdminEmailTemplateEditProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminEmailTemplateEditLazy {...props} />
    </Suspense>
)

export default AdminEmailTemplateEdit
