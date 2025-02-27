import { lazy, Suspense, type JSX } from 'react'

import type { MainLayoutProps } from './MainLayout.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyMainLayout = lazy(async () => await import('./MainLayout'))

const MainLayout = (props: JSX.IntrinsicAttributes & MainLayoutProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyMainLayout {...props} />
    </Suspense>
)

export default MainLayout
