import { lazy, Suspense, type JSX } from 'react'

import type { ConfigProviderProps } from './ConfigProvider.types'

import LoadingOverlay from '@/components/02-molecules/LoadingOverlay/LoadingOverlay'

const LazyConfigProvider = lazy(async () => await import('./ConfigProvider'))

const ConfigProvider = (props: JSX.IntrinsicAttributes & ConfigProviderProps): JSX.Element => (
    <Suspense fallback={<LoadingOverlay show={true} />}>
        <LazyConfigProvider {...props} />
    </Suspense>
)

export default ConfigProvider
