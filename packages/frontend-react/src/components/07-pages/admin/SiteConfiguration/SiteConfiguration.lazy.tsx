import { lazy, Suspense, type JSX } from 'react'

import type { SiteConfigurationProps } from './SiteConfiguration.types'

import LoadingOverlay from '@/components/03-particles/LoadingOverlay/LoadingOverlay'

const SiteConfigurationLazy = lazy(async () => await import('./SiteConfiguration'))

const SiteConfiguration = (props: JSX.IntrinsicAttributes & SiteConfigurationProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <SiteConfigurationLazy {...props} />
    </Suspense>
)

export default SiteConfiguration
