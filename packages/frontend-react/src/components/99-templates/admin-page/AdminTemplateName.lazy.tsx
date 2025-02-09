import { lazy, Suspense, type JSX } from 'react'

import type { AdminTemplateNameProps } from './AdminTemplateName.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminTemplateName = lazy(async () => await import('./AdminTemplateName'))

const AdminTemplateName = (props: JSX.IntrinsicAttributes & AdminTemplateNameProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminTemplateName {...props} />
    </Suspense>
)

export default AdminTemplateName
