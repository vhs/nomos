import { lazy, Suspense, type JSX } from 'react'

import type { AdminSiteConfigurationProps } from './AdminSiteConfiguration.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const AdminSiteConfigurationLazy = lazy(async () => await import('./AdminSiteConfiguration'))

const AdminSiteConfiguration = (props: JSX.IntrinsicAttributes & AdminSiteConfigurationProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <AdminSiteConfigurationLazy {...props} />
    </Suspense>
)

export default AdminSiteConfiguration
