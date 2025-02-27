import { lazy, Suspense, type JSX } from 'react'

import type { AdminTemplateNameItemProps } from './AdminTemplateNameItem.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminTemplateNameItem = lazy(async () => await import('./AdminTemplateNameItem'))

const AdminTemplateNameItem = (props: JSX.IntrinsicAttributes & AdminTemplateNameItemProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminTemplateNameItem {...props} />
    </Suspense>
)

export default AdminTemplateNameItem
