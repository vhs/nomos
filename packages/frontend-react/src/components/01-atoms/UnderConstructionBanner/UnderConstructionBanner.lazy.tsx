import { lazy, Suspense, type JSX } from 'react'

import type { UnderConstructionBannerProps } from './UnderConstructionBanner.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyUnderConstructionBanner = lazy(async () => await import('./UnderConstructionBanner'))

const UnderConstructionBanner = (props: JSX.IntrinsicAttributes & UnderConstructionBannerProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyUnderConstructionBanner {...props} />
    </Suspense>
)

export default UnderConstructionBanner
