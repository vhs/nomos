import { lazy, Suspense, type JSX } from 'react'

import type { AdminSiteConfigurationProps } from './AdminSiteConfiguration.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyAdminSiteConfiguration = lazy(async () => await import('./AdminSiteConfiguration'))

const AdminSiteConfiguration = (props: JSX.IntrinsicAttributes & AdminSiteConfigurationProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyAdminSiteConfiguration {...props} />
    </Suspense>
)

export default AdminSiteConfiguration
