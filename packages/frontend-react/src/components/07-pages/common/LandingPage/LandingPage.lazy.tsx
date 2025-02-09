import { type JSX, lazy, Suspense } from 'react'

import type { LandingPageProps } from './LandingPage.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyLandingPage = lazy(async () => await import('./LandingPage'))

const LandingPage = (props: JSX.IntrinsicAttributes & LandingPageProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyLandingPage {...props} />
    </Suspense>
)

export default LandingPage
